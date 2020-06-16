class UsersController < ApplicationController
    # before_action :define_current_passenger
    
    def create
        user = User.create({
            username: params[:username],
            password: params[:password],
            address: params[:address],
            email: params[:email]
        })
        if user.valid?
            current_user = user
            session[:user_id] = user.id
            render json: { success: true, id: user.id, user: {id: user.id, username: user.username, email: user.email, address: user.address}}
        else
            render json: { success: false}
        end
    end
    
    def index
        render json: User.all
    end
    
    def show
        # byebug
        user = User.find(params[:id])
        # byebug
        render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
                                                                
    end
    
    def update
        user = User.find(params[:id])
        user.update({
            pic_url: params[:newImg]
        })
        render json: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:full_tickets => {:include => [:tickets => {:include => [:airline]}]}, :events => {:include => [:activity]} ]}]
    end
    
    # def destroy
    #     current_passenger.destroy
    #     render json: current_passenger
    # end
    
    
    def define_current_user
        byebug
        if params[:id]
            @current_user = User.find(params[:id])
        # else
        #     @current_user = User.new
        end
    end
    
    # def current_user
    #     @current_user
    #     byebug
    # end
end