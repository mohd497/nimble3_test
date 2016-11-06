class Interface::FrontPageController < ApplicationController

  def home
  end

  def result
  end

  def htmlrender
    keyword_id = params[:id]
    keyword = Adword.find(keyword_id)
    @doc =  Base64.decode64(keyword.html_code)
  end

  def search_keywords
  end

end
