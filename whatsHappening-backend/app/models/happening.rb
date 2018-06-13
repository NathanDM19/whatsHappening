class Happening < ApplicationRecord
  has_and_belongs_to_many :categories
  has_many :attendances
  has_many :users, through: :attendances
  has_many :happening_dates

  geocoded_by :address
  after_validation :geocode
end
