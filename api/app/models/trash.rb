class Trash < ApplicationRecord
  belongs_to :region, foreign_key: 'name', class_name: 'Region', optional: true
end
