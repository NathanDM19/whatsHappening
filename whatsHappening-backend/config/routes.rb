Rails.application.routes.draw do

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  get '/logout' => 'session#destroy'
  get 'home/index'
  get '/happenings.json' => 'happenings#json'
  get '/happenings/:id.json' => 'happenings#single_json'
  get '/getuser' => 'user#find_current_user'

  root to: 'home#index'

  resources :happenings
  resources :categories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
