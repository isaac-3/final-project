class Airline < ApplicationRecord
    has_many :tickets
    has_many :trips, through: :tickets
end
