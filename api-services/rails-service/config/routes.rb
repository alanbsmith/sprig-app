Rails.application.routes.draw do

  get 'current_user', to: 'application#current_user'
  get 'request_token', to: 'tokens#request_token'
  get 'access_token', to: 'tokens#access_token'

  namespace :api do
    namespace :v1 do
      resources :available_dates, only: [:index, :show]
      resources :available_times, only: [:index, :show]
      resources :events, only: [:show, :new, :update]
    end
  end

end
