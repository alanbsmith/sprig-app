class EventBuilder < ActiveRecord::Base

  def self.create_from_client(params)
    lat_long = geocode_location(params['data']['location'])
    @event = Event.create( 
      title:        params['data']['title'],
      description:  params['data']['description'],
      location:     params['data']['location'],
      latitude:     lat_long['lat'],
      longitude:    lat_long['lng']
    )
    create_available_dates(params)

  end
end

private

  def create_available_dates(params)
    params['data']['availability'].each do |date|
      available_date = AvailableDate.create(
        display_day:  date[1]['displayDay'],
        day:          date[1]['day'], 
        date:         date[1]['date'], 
        month:        date[1]['month'], 
        event_id:     @event.id
      )
      date[1]['availableTimes'].each do |time|
        formatted_times = time[1]['timeSlot']
        AvailableTime.create(
          display_time:       time[1]['displayTime'], 
          time_slot:          time[1]['timeSlot'], 
          start_time:         formatted_times[0], 
          end_time:           formatted_times[1], 
          available_date_id:  available_date.id
        )
      end
    end
  end
  
  def format_time_range(time_range)
    time_range.split(' - ').map(&:to_time)
  end

  def geocode_location(location)
    Geocoder.search(location).first.data['geometry']['location']
  end
