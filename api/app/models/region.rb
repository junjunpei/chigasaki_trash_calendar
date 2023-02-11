class Region < ApplicationRecord
  has_many :users
  has_many :trashes, primary_key: 'name'
end
