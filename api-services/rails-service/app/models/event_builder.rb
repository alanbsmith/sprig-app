class EventBuilder < ActiveRecord::Base

  def self.create_from_client(params)
    lat_long = geocode_location(params['location'])
    @event = Event.create( 
      title:        params['title'],
      description:  params['description'],
      location:     params['location'],
      latitude:     lat_long['lat'],
      longitude:    lat_long['lng'],
      attendee:     params['attendee']
    )
    @event.url = "http://localhost:8080/#/events/#{@event.id}"
    create_available_dates(params)
    send_notification_to(@event, 'attendee')
  end

  def self.create_available_dates(params)
    params['availability'].each do |date|
      available_date = AvailableDate.create(
        display_day:  date[1]['displayDay'],
        day:          date[1]['day'], 
        date:         date[1]['date'], 
        month:        date[1]['month'], 
        event_id:     @event.id
      )
      if date[1]['availableTimes'].present?
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
  end

  def self.send_notification_to(event, recipient)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.secrets.twitter_consumer_key
      config.consumer_secret     = Rails.application.secrets.twitter_consumer_secret
      config.access_token        = Rails.application.secrets.twitter_access_token
      config.access_token_secret = Rails.application.secrets.twitter_access_token_secret
    end
    if recipient == 'attendee'
      client.create_direct_message("#{event.attendee}", "Alan has invited you to #{event.title}! Click this link to confirm a time! #{event.url}")
    else
      client.create_direct_message("@_alanbsmith", "#{event.attendee} has RSVP'd for #{event.title} at #{event.confirmed_time} on #{event.confirmed_date}!")
    end
  end

  def self.update_confirmation(params)
    date = params['selected_date']
    time = params['selected_time']
    event = Event.find(params['event_id'])
    event.confirmed_date = "#{date['day']}, #{date['month']} #{date['date']}"
    event.confirmed_time = "#{time['time_slot']}"
    send_notification_to(event, 'organizer')
  end
end

private
  
  def format_time_range(time_range)
    time_range.split(' - ').map(&:to_time)
  end

  def geocode_location(location)
    Geocoder.search(location).first.data['geometry']['location']
  end

