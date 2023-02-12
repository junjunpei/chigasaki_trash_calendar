class Trash < ApplicationRecord
  belongs_to :region, foreign_key: 'region_id', optional: true, primary_key: 'name'
end
