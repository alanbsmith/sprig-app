class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string  :title,        null: false
      t.text    :description,  null: false
      t.string  :location,     null: false
      t.string  :latitude,     null: false
      t.string  :longitude,    null: false
      t.string  :url
      t.string  :attendee
      t.boolean :confirmed
      t.string  :confirmed_date
      t.string  :confirmed_time
      t.timestamps null: false
    end
  end
end
