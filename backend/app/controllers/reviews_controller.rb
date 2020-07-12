class ReviewsController < ApplicationController


    def create
        restaurant = Restaurant.find_or_create_by(name: params[:restaurant])
        user = User.find(params[:user_id])
        review = Review.create({
            review: params[:review],
            restaurant_id: restaurant.id,
            user_id: user.id
        })
        render json: review, :include => [:user]
    end

    def spec_reviews
        restaurant = Restaurant.find_or_create_by(name: params[:restaurant][:name])
        reviews = restaurant.reviews
        render json: reviews, :include => [:user]
    end
end
