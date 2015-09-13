class CreateOauths < ActiveRecord::Migration
  def change
    create_table :oauths do |t|
      t.string :token,  null: false
      t.string :secret, null: false
    end
  end
end
