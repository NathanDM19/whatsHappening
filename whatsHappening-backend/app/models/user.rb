class User < ApplicationRecord
  has_secure_password
  has_many :happenings, through: :attendances
  has_many :attendances
end
