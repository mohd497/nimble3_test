class TypesChangeForSearch < ActiveRecord::Migration
  def change
    remove_column :adwords, :url_top
    remove_column :adwords, :url_bottom
    remove_column :adwords, :url_no_ad

    add_column :adwords, :url_top, :text, array:true, default: []
    add_column :adwords, :url_bottom, :text, array:true, default: []
    add_column :adwords, :url_no_ad, :text, array:true, default: []
  end
end
