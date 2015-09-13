class Api::V1::EventsController < ApplicationController

  def index
    render json: Event.all
  end

  def show
    #binding.pry
    event = Event.find(params[:id])
    data  = build_response_data(event)
    render json: data
  end

  def new
    event = EventBuilder.create_from_client(params)
    render json: event
  end

  def destroy
  end

private

  def event_params
    params.require(:event).permit(
                                    :title,
                                    :description,
                                    :start_time,
                                    :end_time,
                                    :location,
                                    :latitude,
                                    :longitude
                                 )
  end

  def build_response_data(event)
    data = {
             event: event,
             available_dates: event.available_dates,
             available_times: event.available_dates.map(&:available_times)
           }
  end

end
