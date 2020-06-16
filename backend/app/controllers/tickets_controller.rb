class TicketsController < ApplicationController

    def create
        user = User.find(params[:user_id])
        airline1 = Airline.find_or_create_by(name: params[:ticket][:departure][:name])
        airline2 = Airline.find_or_create_by(name: params[:ticket][:destination][:name])
        full_ticket = FullTicket.create(trip_id: params[:trip_id])
        # byebug
        ticket1 = Ticket.create({
            date: params[:ticket][:dep_date],
            full_ticket_id: full_ticket.id,
            airline_id: airline1.id
        })
        ticket2 = Ticket.create({
            date: params[:ticket][:dest_date],
            full_ticket_id: full_ticket.id,
            airline_id: airline2.id
        })
    end

end