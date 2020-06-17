class Activity < ApplicationRecord
    has_many :events
    has_many :trips, through: :events
    has_many :activity_reviews
end
