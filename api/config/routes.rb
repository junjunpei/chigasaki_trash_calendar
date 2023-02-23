Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/register_region', to: 'regions#register_region'
  get '/get_trash_dates', to: 'trashes#get_trash_dates'
end
