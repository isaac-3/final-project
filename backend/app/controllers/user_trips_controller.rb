class UserTripsController < ApplicationController
    def create
        user = User.find_by(username: params[:user])
        trip = Trip.find(params[:trip][:id])
        user_trip = UserTrip.create({
            user_id: user.id,
            trip_id: trip.id
        })
        render json: user
    end
end
