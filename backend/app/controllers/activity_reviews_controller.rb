class ActivityReviewsController < ApplicationController


    def create
        activity = Activity.find_or_create_by(name: params[:activity])
        user = User.find(params[:user_id])
        review = ActivityReview.create({
            review: params[:review],
            activity_id: activity.id,
            user_id: user.id
        })
        render json: review, :include => [:user]
    end

    def act_reviews
        activity = Activity.find_or_create_by(name: params[:activity])
        reviews = activity.activity_reviews
        render json: reviews, :include => [:user]
    end
end