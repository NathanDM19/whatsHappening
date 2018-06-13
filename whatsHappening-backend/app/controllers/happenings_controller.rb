class HappeningsController < ApplicationController

  def new
    @Happening = Happening.new
  end

  def create
    Happening.create happening_params
    redirect_to happenings_path
  end

  def index
    @Happenings = Happening.all
  end

  def show
    @Happening = Happening.find params[:id]
  end

  def edit
    @Happening = Happening.find params[:id]
  end

  def update
    happening = Happening.find params[:id]
    happening.update happening_params
    redirect_to happenings_path
  end

  def destroy
    happening = Happening.find params[:id]
    happening.destroy
    redirect_to happenings_path
  end
  
  def near
    @happenings_near = Happening.near([params[:lat], params[:long]], params[:proximity])
    render :json => @happenings_near.as_json
  end

  def json
    render json: Happening.all, include: [:happening_dates, {attendances: {include: [:users]}}, :categories]
  end

  def single_json
    render json: Happening.find(params[:id]), include: [:happening_dates, {attendances: {include: [:users]}}, :categories]
  end

  private
  def happening_params
    params.require(:happening).permit(:name, :city, :address, :latitude, :longitude, :happening_type, :description, :url, :when, :time)
  end
end
