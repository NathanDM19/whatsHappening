class HomeController < ApplicationController
  def index
    session[:user_id] = "my_fake_test_ID"
  end
end
