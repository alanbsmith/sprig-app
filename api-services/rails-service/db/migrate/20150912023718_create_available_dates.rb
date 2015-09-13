class CreateAvailableDates < ActiveRecord::Migration
  def change
    create_table :available_dates do |t|
      t.string :display_day,  null: false
      t.string :day,          null: false
      t.string :date,         null: false
      t.string :month,        null: false
      t.string :event_id,     null: false
    end
  end
end
