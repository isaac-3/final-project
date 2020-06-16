class Experience < ApplicationRecord
    belongs_to :trip
    # has_many :users, through: :trips
end
