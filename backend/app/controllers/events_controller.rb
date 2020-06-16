class EventsController < ApplicationController
    def create
        # byebug
        user = User.find(params[:user_id])
        # byebug
        activity = Activity.find_or_create_by(name: params[:activity][:name])
        # byebug
        event = Event.create({
            trip_id: params[:trip_id],
            activity_id: activity.id
        })
        # byebug
    end
end
