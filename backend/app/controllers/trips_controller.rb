class TripsController < ApplicationController

    def get_users
        trip = Trip.find(params[:id])
        all_users = trip.users
        render json: all_users
        # byebug
    end

    def create
        trip = Trip.create({
            trip_date: Time.now
        })
        UserTrip.create({user_id: params[:user_id], trip_id: trip.id})
        user = User.find(params[:user_id])
        render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
    end

    def destroy
        trip = Trip.find(params[:id])
        # byebug
        # trip.destroy
        user = User.find(params[:user_id])
        # byebug
        new_trips = user.trips.select{ |t| t.id != trip.id}
        user.update_attribute(:trips, new_trips)
        # byebug
        render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]

    end

    def change_date
        trip = Trip.find(params[:id])
        trip.update({
            trip_date: params[:trip_date]
        })
        render json: trip
    end

    def change_name
        trip = Trip.find(params[:id])
        trip.update({
            name: params[:newname]
        })
        render json: trip
        # byebug
    end

    def update
        trip = Trip.find(params[:id])
        # byebug
        if params[:book][:hotel]
            # to remove
            del_book = trip.bookings.select{|o| o.id == params[:book][:id]}.first
            upd_books = trip.bookings.select{|o| o.id != del_book.id}
            trip.update_attribute(:bookings, upd_books)
            user = User.find_by(id: params[:user_id])
            render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
        elsif params[:book][:restaurant]
            # to remove
            del_rest = trip.reservations.select{|o| o.id == params[:book][:id]}.first
            upd_rests = trip.reservations.select{|o| o.id != del_rest.id}
            trip.update_attribute(:reservations, upd_rests)
            # byebug
            user = User.find_by(id: params[:user_id])
            render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
        elsif params[:book][:tickets]
            # to remove
            del_ticket = trip.full_tickets.select{|o| o.id == params[:book][:id]}.first
            upd_tickets = trip.full_tickets.select{|o| o.id != del_ticket.id}
            trip.update_attribute(:full_tickets, upd_tickets)
            user = User.find_by(id: params[:user_id])
            render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
        elsif params[:book][:activity]
            # to remove
            del_event = trip.events.select{|o| o.id == params[:book][:id]}.first
            upd_events = trip.events.select{|o| o.id != del_event.id}
            trip.update_attribute(:events, upd_events)
            user = User.find_by(id: params[:user_id])
            render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
        end
    end

    def show
        trip = Trip.find(params[:id])

        render json: trip, :include => [:users, :bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]}]
        # user = User.find_by(id: trip.user_id)

        # render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
    end
end