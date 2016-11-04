class Adword < ActiveRecord::Base
  belongs_to :user, foreign_key: 'user_id'
  scoped_search on: [:url_top, :url_bottom, :url_no_ad]


end
