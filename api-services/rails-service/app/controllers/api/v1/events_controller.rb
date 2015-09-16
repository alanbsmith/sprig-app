class Api::V1::EventsController < ApplicationController

  def show
    event = Event.find(params[:id])
    data  = build_response_data(event)
    render json: data
  end

  def new
    event = EventBuilder.create_from_client(params)
    render json: event
  end

  def update
    event = EventBuilder.update_confirmation(params)
    render json: event
  end

private

  def build_response_data(event)
    data = {
             event: event,
             available_dates: event.available_dates,
             available_times: event.available_dates.map(&:available_times)
           }
  end

end
