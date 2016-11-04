class CreateAdwords < ActiveRecord::Migration
  def change
    create_table :adwords do |t|
      t.integer :top_ad_count
      t.integer :bottom_ad_count
      t.integer :total_ad_count
      t.text :url_top
      t.text :url_bottom
      t.integer :no_ad_count
      t.text :url_no_ad
      t.integer :total_link_count
      t.string :total_search_result
      t.text :html_code
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
