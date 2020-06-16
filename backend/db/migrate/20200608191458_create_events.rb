class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.integer :trip_id
      t.integer :activity_id
      
      t.timestamps
    end
  end
end
