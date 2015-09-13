class AvailableDate < ActiveRecord::Base
  belongs_to :event
  has_many  :available_times
end