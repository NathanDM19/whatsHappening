class SearchController < ApplicationController
  def index
    @happenings_near = Happening.near([params[:lat], params[:long]], params[:proximity])
    render :json => @happenings_near.as_json
  end
end