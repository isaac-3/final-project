class CreateHotelReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :hotel_reviews do |t|
      t.string :review
      t.integer :hotel_id
      t.integer :user_id

      t.timestamps
    end
  end
end
