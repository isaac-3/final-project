class ExperiencesController < ApplicationController
    def index
        experiences = Experience.all
        render json: experiences, :include => [:trip => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
    end

    def create
        experience = Experience.create({
            trip_id: params[:trip][:id]
        })
    end

end
