class ChangeDataNameToTrashes < ActiveRecord::Migration[7.0]
  def change
    change_column :trashes, :name, :integer
  end
end
