class Api::V1::KeywordsController < ApplicationController
  require 'open-uri'
  require 'nokogiri'
  before_action -> { doorkeeper_authorize! :api }

  def google_search
    csv = params["csv"]
    if params["csv"].present? && params["csv"].content_type == "text/csv"
      csv_data = SmarterCSV.process(csv.tempfile)
      csv_values = []

      for data in csv_data
        csv_values << data.values[0]
      end

      if not csv_values.empty?
       SearchAndStore.perform_async(csv_values, current_resource_owner.id)
      else
        render json: { error: I18n.t("error_empty")}, status: 400
      end
      render json: { success: I18n.t("success_upload") }, status: 201
    else
      render json: { error: I18n.t("general_error") }, status: 400
    end
  end

  def view_report
    reports = current_resource_owner.adwords
    render json: reports, status: 200
  end

  def search_report
    keyword = params[:keyword]
    url = params[:url]
    adwords = current_resource_owner.adwords

    #TODO: Have better approach in this. Maybe use JSON instead of array?
    adwords_array = build_adwords(adwords)
    adwords_count = build_adwords_count(adwords_array, keyword, url)
    render json: { count: adwords_count }, status: 200
  end

  private

  def build_adwords(adwords)
    adwords_array = []
    adwords.each do |ad|

      unless ad.url_top.nil?
        ad.url_top.each do |top|
          adwords_array << top
        end
      end

      unless ad.url_bottom.nil?
        ad.url_bottom.each do |bottom|
          adwords_array << bottom
        end
      end

    end
    return adwords_array
  end

  def build_adwords_count(adwords_array, keyword, url)
    adwords_count = 0
    unless keyword.empty?
      adwords_array.each do |link|
        if link.include? keyword
          adwords_count = adwords_count + 1
        end
      end
    end

    unless url.nil?
      adwords_array.each do |link|
        if link == url
          adwords_count = adwords_count + 1
        end
      end
    end
    return adwords_count
  end

end
