class CategoriesHappenings < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_happenings do |t|
      t.integer :category_id
      t.integer :happening_id

      t.timestamps
    end
  end
end
