class UserController < ApplicationController
  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def find_current_user
    if session[:user_id]
    render json: User.find( session[:user_id] )
    else 
    render json: ""
    end
  end
end
