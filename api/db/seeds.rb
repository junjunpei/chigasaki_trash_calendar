# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'

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
    Trash.where(name: n['trash'], date: n['date'], region_id: i).first_or_create!(
      name: n['trash'],
      date: n['date'],
      region_id: i
    )
  end
end