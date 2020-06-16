class Hotel < ApplicationRecord
    has_many :bookings
    has_many :trips, through: :bookings
end
