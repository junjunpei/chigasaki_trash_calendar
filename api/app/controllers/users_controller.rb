class UsersController < ApplicationController
  def create
    @region = Region.find_by(town_name: params[:town_name])
    @user = User.create!(region_id: @region.name)
    render json: @user
  end

  def update
  end
end
