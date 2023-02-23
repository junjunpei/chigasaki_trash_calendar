class RegionsController < ApplicationController
  def register_region
    @region = Region.find_by(town_name: params[:town_name])
    render json: @region
  end
end
