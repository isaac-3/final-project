class FullTicket < ApplicationRecord
    belongs_to :trip
    has_many :tickets
    # belongs_to :ticket
end
