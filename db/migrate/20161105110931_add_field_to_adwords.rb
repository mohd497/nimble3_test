class AddFieldToAdwords < ActiveRecord::Migration
  def change
    add_column :adwords, :keyword, :string
  end
end
