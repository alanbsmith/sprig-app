class AvailableTime < ActiveRecord::Base
  belongs_to  :available_dates
  belongs_to  :event
end