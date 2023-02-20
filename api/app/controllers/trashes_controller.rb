class TrashesController < ApplicationController
  def get_trash_dates
    @trashes = Trash.where(region_id: params[:region_id])
    render json: @trashes
  end
end
