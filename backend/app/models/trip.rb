class Trip < ApplicationRecord
    # belongs_to :user
    has_many :user_trips
    has_many :users, through: :user_trips

    # has_and_belongs_to_many :users
    has_many :bookings
    has_many :hotels, through: :bookings

    has_many :reservations
    has_many :restaurants, through: :reservations

    # has_many :tickets
    # has_many :airlines, through: :tickets

    has_many :events
    has_many :activites, through: :events

    has_many :full_tickets
    has_many :tickets, through: :full_tickets
    has_many :airlines, through: :tickets

    has_many :experiences

end


# usertrips
# belongs_to:user
# belongs_to trip
