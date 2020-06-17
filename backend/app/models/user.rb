class User < ApplicationRecord
    has_secure_password
    validates :username, :presence => true, :uniqueness => true
    
    has_many :user_trips
    has_many :trips, through: :user_trips
    has_many :experiences, through: :trips

    has_many :bookings, through: :trips
    has_many :hotels, through: :bookings

    has_many :reservations, through: :trips
    has_many :restaurants, through: :reservations

    has_many :full_tickets, through: :trips
    has_many :tickets, through: :full_tickets
    has_many :airlines, through: :tickets
    
    has_many :events, through: :trips
    has_many :activities, through: :events

    has_many :reviews
    has_many :activity_reviews
    has_many :hotel_reviews

end
