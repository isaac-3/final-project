class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      # t.integer :user_id
      t.string :trip_date
      t.string :name
      
      t.timestamps
    end
  end
end
