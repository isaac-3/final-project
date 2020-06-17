class CreateActivityReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :activity_reviews do |t|
      t.string :review
      t.integer :activity_id
      t.integer :user_id

      t.timestamps
    end
  end
end
