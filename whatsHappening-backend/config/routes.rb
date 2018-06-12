Rails.application.routes.draw do

  get 'home/index'
  get '/happenings.json' => 'happenings#json'
  get '/happenings/:id.json' => 'happenings#single_json'

  root to: 'home#index'

  resources :happenings
  resources :categories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
