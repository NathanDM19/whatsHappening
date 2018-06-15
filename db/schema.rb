# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_09_072149) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendances", force: :cascade do |t|
    t.integer "happening_id"
    t.integer "user_id"
    t.integer "vibe_rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.text "name"
    t.integer "parent_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories_happenings", id: false, force: :cascade do |t|
    t.bigint "category_id"
    t.bigint "happening_id"
    t.index ["category_id"], name: "index_categories_happenings_on_category_id"
    t.index ["happening_id"], name: "index_categories_happenings_on_happening_id"
  end

  create_table "happening_dates", force: :cascade do |t|
    t.integer "happening_id"
    t.date "date"
    t.boolean "daily_flag"
    t.time "start_time"
    t.time "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "happenings", force: :cascade do |t|
    t.text "name"
    t.text "city"
    t.text "address"
    t.float "latitude"
    t.float "longitude"
    t.text "happening_type"
    t.text "description"
    t.text "url"
    t.text "when"
    t.text "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["latitude", "longitude"], name: "index_happenings_on_latitude_and_longitude"
  end

  create_table "users", force: :cascade do |t|
    t.text "name"
    t.string "password_digest"
    t.boolean "admin_flag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
