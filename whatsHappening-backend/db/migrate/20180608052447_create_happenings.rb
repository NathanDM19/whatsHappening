class CreateHappenings < ActiveRecord::Migration[5.2]
  def change
    create_table :happenings do |t|
      t.text :name
      t.text :city
      t.text :address
      t.float :latitude
      t.float :longitude
      t.text :happening_type
      t.text :description
      t.text :url
      t.text :when
      t.text :time

      t.timestamps
    end

    add_index :happenings, [:latitude, :longitude]
  end
end
