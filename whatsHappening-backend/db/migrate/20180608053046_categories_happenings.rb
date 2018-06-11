class CategoriesHappenings < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_happenings, id: false do |t|
      t.belongs_to :category, index: true
      t.belongs_to :happening, index: true
    end
  end
end
