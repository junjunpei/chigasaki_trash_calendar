class CreateRegions < ActiveRecord::Migration[7.0]
  def change
    create_table :regions do |t|
      t.integer :name, null: false
      t.string :town_name, null: false
      t.timestamps
    end
  end
end
