class CreateHappeningDates < ActiveRecord::Migration[5.2]
  def change
    create_table :happening_dates do |t|
      t.integer :happening_id
      t.date :date
      t.boolean :daily_flag
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
