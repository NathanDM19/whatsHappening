class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.integer :happening_id
      t.integer :user_id
      t.integer :vibe_rating

      t.timestamps
    end
  end
end
