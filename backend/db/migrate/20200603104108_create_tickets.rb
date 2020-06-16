class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.integer :full_ticket_id
      t.string :date
      # t.integer :trip_id
      t.integer :airline_id
      # t.integer :airline_id2
      t.timestamps
    end
  end
end
