class CreateHappenings < ActiveRecord::Migration[5.2]
  def change
    create_table :happenings do |t|
      t.text :name
      t.text :city
      t.text :address
      t.float :latitude
      t.float :longitude
      t.text :type
      t.text :description
      t.date :date
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
