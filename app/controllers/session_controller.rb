class SessionController < ApplicationController
  def new
  end
  def create
    user = User.find_by name: params[:name]
    if user.present? && user.authenticate(params[:password])
      cookies[:user_id] = user.id
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash[:error] = "Invalid email or password"
      redirect_to login_path
    end
  end
  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
