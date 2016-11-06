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
        render json: { error: "Seems like CSV have no data in it" }, status: 400
      end
      render json: { success: "Uploaded successfuly" }, status: 201
    else
      render json: { error: "Something went wrong" }, status: 400
    end
  end

  def view_report
    reports = current_resource_owner.adwords
    render json: reports, status: 200
  end

  def search_report
    keyword = params[:keyword]
    url = params[:url]

    adwords_array = []
    adwords_count = 0
    adwards = Adword.all

    adwards.each do |ad|

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

    unless keyword.empty?
      adwords_array.each do |link|
        if link.include? keyword
          adwords_count = adwords_count + 1
        end
      end
    else
      adwords_array.each do |link|
        if link == url
          adwords_count = adwords_count + 1
        end
      end
    end

    render json: { count: adwords_count }, status: 200


  end
end
