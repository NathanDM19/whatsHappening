class CategoriesController < ApplicationController
  def new
    @Category = Category.new
  end

  def create
    Category.create category_params
    redirect_to categories_path
  end

  def index
    @Categories = Category.all
  end

  def show
    @Category = Category.find params[:id]
  end

  def edit
    @Category = Category.find params[:id]
  end

  def update
    category = Category.find params[:id]
    category.update category_params
    redirect_to categories_path
  end

  def destroy
    category = Category.find params[:id]
    category.destroy
    redirect_to categories_path
  end

  private
  def category_params
        params.require(:category).permit(:name, :parent_category_id)
  end
end
