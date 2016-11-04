class Api::V1::KeywordsController < ApplicationController
  require 'open-uri'
  require 'nokogiri'
  before_action -> { doorkeeper_authorize! :api }

  def google_search
    keywords = []
    keywords << "mobile phone shopping"

    for noun in keywords
      @file = open("https://www.google.com/search?q=#{noun}")
      @document = Nokogiri::HTML(@file)

      @top_ad = @document.css('#_Ltg')
      @top_ad_count = @top_ad.css('.ads-ad').count

      @bottom_ad = @document.css('#_Ktg')
      @bottom_ad_count = @bottom_ad.css('.ads-ad').count

      @total_ad_count = @document.css('.ads-ad').count

      if @top_ad_count > 0
       @top_ad_urls =   @top_ad.css('._WGk').map(&:inner_text).flatten
      end

      if @bottom_ad_count > 0
        @bottom_ad_urls = @bottom_ad.css('._WGk').map(&:inner_text).flatten
      end

      @non_ad = @document.css('#search')
      @non_ad_count = @non_ad.css('.g').count

      @non_ad_urls = @non_ad.css('.kv cite').map(&:inner_text).flatten

      @total_link_count = @document.css('a').count

      @result =  @document.css('#resultStats').first.text

      @user_id = current_resource_owner.id

      @document = @document.to_html
      search_store = Adword.new(
          top_ad_count: @top_ad_count,
          bottom_ad_count: @bottom_ad_count,
          total_ad_count: @top_ad_count,
          url_top: @top_ad_urls,
          url_bottom: @bottom_ad_urls,
          no_ad_count: @non_ad_count,
          url_no_ad: @non_ad_urls,
          total_link_count: @total_link_count,
          total_search_result: @result,
          html_code: @document,
          user_id: @user_id

      )
      search_store.save


    end

    render json: { success: "Uploaded successfuly" }, status: 201

  end

  def view_report
    reports = current_resource_owner.adwords
    render json: reports, status: 200
  end

  def search_report
    q = params[:word_filter]
    if not params[:word_filter].nil?


    end


  end

end
