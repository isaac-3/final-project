class CreateFullTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :full_tickets do |t|
      # t.integer :ticket_id
      t.integer :trip_id
      t.timestamps
    end
  end
end
