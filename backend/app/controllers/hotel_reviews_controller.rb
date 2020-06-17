class HotelReviewsController < ApplicationController

    def create
        hotel = Hotel.find_or_create_by(name: params[:hotel])
        # byebug
        user = User.find(params[:user_id])
        review = HotelReview.create({
            review: params[:review],
            hotel_id: hotel.id,
            user_id: user.id
        })
        # byebug
        render json: review, :include => [:user]
    end

    def hot_reviews
        # byebug
        hotel = Hotel.find_or_create_by(name: params[:hotel])
        # byebug
        reviews = hotel.hotel_reviews
        render json: reviews, :include => [:user]
    end
end