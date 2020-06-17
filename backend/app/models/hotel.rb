class Hotel < ApplicationRecord
    has_many :bookings
    has_many :trips, through: :bookings
    has_many :hotel_reviews
end
