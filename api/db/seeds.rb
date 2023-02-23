# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'

TRASH_NAME = {
  '衣類・布類' => 'clothes',
  'プラスチック製容器包装類' => 'plastic',
  '燃やせるごみ' => 'burnable',
  "びん・かん・ペットボトル\n廃食用油・金属油" => 'bottles_and_oil',
  '燃やせないごみ' => 'unburnable',
  '古紙類' => 'paper',
  '収集なし' => 'nothing'
}

(1..8).to_a.each do |i|
  CSV.foreach('./app/assets/town.csv', headers: true) do |n|
    next if n["Region#{i}"].nil?
    Region.where(town_name: n["Region#{i}"]).first_or_create!(
      town_name: n["Region#{i}"],
      name: i
    )
  end
end

(1..8).to_a.each do |i|
  CSV.foreach("./app/assets/region#{i}.csv", headers: true) do |n|
    Trash.where(name: TRASH_NAME[n['trash']], date: n['date'], region_id: i).first_or_create!(
      name: TRASH_NAME[n['trash']],
      date: n['date'],
      region_id: i
    )
  end
end