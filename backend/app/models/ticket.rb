class Ticket < ApplicationRecord
    belongs_to :full_ticket
    belongs_to :airline
end
