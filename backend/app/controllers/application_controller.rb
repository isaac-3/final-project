class ApplicationController < ActionController::API
    
    rescue_from Exception, :with => :render_error_response

    def render_error_response(error)
        render json: error
    end

    def current_user
        User.find(session[:user_id])
    end

end