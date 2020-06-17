class ActivityReviewsController < ApplicationController


    def create
        activity = Activity.find_or_create_by(name: params[:activity])
        user = User.find(params[:user_id])
        review = ActivityReview.create({
            review: params[:review],
            activity_id: activity.id,
            user_id: user.id
        })
        # byebug
        render json: review, :include => [:user]
    end

    def act_reviews
        # byebug
        activity = Activity.find_or_create_by(name: params[:activity])
        # byebug
        reviews = activity.activity_reviews
        render json: reviews, :include => [:user]
    end
end