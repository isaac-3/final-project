class Activity < ApplicationRecord
    has_many :events
    has_many :trips, through: :events

end
