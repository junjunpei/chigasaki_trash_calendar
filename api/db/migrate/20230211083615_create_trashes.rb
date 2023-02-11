class CreateTrashes < ActiveRecord::Migration[7.0]
  def change
    create_table :trashes do |t|
      t.references :region, foreign_key: true
      t.string :name, null: false
      t.date :date, null: false
      t.timestamps
    end
  end
end
