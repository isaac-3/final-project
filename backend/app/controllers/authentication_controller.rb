class AuthenticationController < ApplicationController

    def login
        user = User.find_by({ username: params[:username]})
        if(user && user.authenticate(params[:password]))
            session[:user_id] = user.id
            # render json: { success: true, id: user.id, loggeduser: user, :include => [:trips => {:include => [:bookings => {:include => [:hotel]}, :reservations => {:include => [:restaurant]},:tickets => {:include => [:airline]} ]}]}

            render json: { success: true, id: user.id, loggeduser: user}
            # user, :include => [ :carts => {:include => [:orders => {:include => [:product]}]}]}
            # {username: user[:username],email: user[:email], address: user[:address]}
        else
            render json: { success: false, id: nil }
        end
    end


end