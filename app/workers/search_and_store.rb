class SearchAndStore
  include Sidekiq::Worker


  #delay if google blocks the job then retry after some time
  sidekiq_retry_in do |count|
    5000
  end

  def perform(csv_values, current_resource_owner_id)
    for noun in csv_values

      document = nokogiri_document(noun)
      top_ad_count = top_ad_count_document(document)
      bottom_ad_count = bottom_ad_count_document(document)
      total_ad_count = total_ad_count_document(document)
      top_ad_urls =   top_ad_urls_document(document, top_ad_count)
      bottom_ad_urls = bottom_ad_urls_document(document, bottom_ad_count)
      non_ad_count = non_ad_count_document(document)
      non_ad_urls = non_ad_urls_document(document)
      total_link_count = total_link_count_document(document)
      result =  result_document(document)

      user_id = current_resource_owner_id.to_i

      document = Base64.encode64(document.to_html)

      search_store = Adword.new(
          keyword: noun,
          top_ad_count: top_ad_count,
          bottom_ad_count: bottom_ad_count,
          total_ad_count: total_ad_count,
          url_top: top_ad_urls,
          url_bottom: bottom_ad_urls,
          no_ad_count: non_ad_count,
          url_no_ad: non_ad_urls,
          total_link_count: total_link_count,
          total_search_result: result,
          html_code: document,
          user_id: user_id
      )
      search_store.save

    end
  end

  def nokogiri_document(noun)
    file = open("https://www.google.com/search?q=#{noun}")
    Nokogiri::HTML(file)
  end

  def top_ad_count_document(document)
    top_ad = document.css('#_Ltg')
    top_ad.css('.ads-ad').count
  end

  def bottom_ad_count_document(document)
    bottom_ad = document.css('#_Ktg')
    bottom_ad.css('.ads-ad').count
  end

  def total_ad_count_document(document)
    document.css('.ads-ad').count
  end

  def top_ad_urls_document(document, top_ad_count)
    top_ad = document.css('#_Ltg')
    if top_ad_count > 0
      top_ad.css('._WGk').map(&:inner_text).flatten
    else
      ""
    end
  end

  def bottom_ad_urls_document(document, bottom_ad_count)
    bottom_ad = document.css('#_Ktg')
    if bottom_ad_count > 0
      bottom_ad.css('._WGk').map(&:inner_text).flatten
    else
      ""
    end
  end

  def non_ad_count_document(document)
    non_ad = document.css('#search')
    non_ad.css('.g').count
  end

  def non_ad_urls_document(document)
    non_ad = document.css('#search')
    non_ad.css('.kv cite').map(&:inner_text).flatten
  end

  def total_link_count_document(document)
    document.css('a').count
  end

  def result_document(document)
    document.css('#resultStats').first.text
  end

end