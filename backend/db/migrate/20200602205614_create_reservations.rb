class CreateReservations < ActiveRecord::Migration[6.0]
  def change
    create_table :reservations do |t|
      t.integer :trip_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
