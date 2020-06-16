class ReservationsController < ApplicationController
    def create
        user = User.find(params[:user_id])
        restaurant = Restaurant.find_or_create_by(name: params[:restaurant][:name])
        reservation = Reservation.create({
            trip_id: params[:trip_id],
            restaurant_id: restaurant.id 
        })
    end
end

