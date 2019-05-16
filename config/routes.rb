Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'login', to: 'sessions#create'
      resources :ideas, only: [:index, :create, :update, :destroy]
    end
  end
end
