class BookingsController < ApplicationController
    def create
        user = User.find(params[:user_id])
        hotel = Hotel.find_or_create_by(name: params[:hotel][:name])
        reservation = Booking.create({
            trip_id: params[:trip_id],
            hotel_id: hotel.id 
        })
    end
end
