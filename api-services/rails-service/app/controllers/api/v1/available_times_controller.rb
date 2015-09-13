class Api::V1::AvailableTimesController < ApplicationController

  def index
    render json: AvailableTime.all
  end

  def show
    render json: AvailableTime.find(params[:id])
  end

end
