class Restaurant < ApplicationRecord
    has_many :reservations
    has_many :trips, through: :reservations
    has_many :reviews
end
