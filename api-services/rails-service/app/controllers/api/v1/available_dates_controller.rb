class Api::V1::AvailableDatesController < ApplicationController

  def index
    render json: AvailableDate.all
  end

  def show
    render json: AvailableDate.find(params[:id])
  end

end
