class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :address
      t.string :email
      t.string :pic_url

      t.timestamps
    end
  end
end
