class CreateAvailableTimes < ActiveRecord::Migration
  def change
    create_table :available_times do |t|
      t.string :display_time,       null: false
      t.string :time_slot,          null: false
      t.string :start_time,         null: false
      t.string :end_time,           null: false
      t.string :available_date_id,  null: false
    end
  end
end
