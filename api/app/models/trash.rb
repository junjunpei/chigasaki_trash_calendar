class Trash < ApplicationRecord
  belongs_to :region, foreign_key: 'region_id', optional: true, primary_key: 'name'

  enum name: {
    clothes: 0,
    plastic: 1,
    burnable: 2,
    bottles_and_oil: 3,
    unburnable: 4,
    paper: 5,
    nothing: 6
  }
end
