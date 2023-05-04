# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  authenticated :user do
    scope module: 'authenticated' do
      get 'registration/:user_type', to: redirect('/')
      get 'login', to: redirect('/')
      get 'password-reset', to: redirect('/')
      get 'password-reset/edit', to: redirect('/')
      # get '/forums', to: "forums#index"

      namespace :api do
        patch '/profile', to: 'profile#update'
      end

      # Lender that has not completed profile / lending settings
      constraints(lambda { |request| request.env['warden'].user.lender? && !request.env['warden'].user&.lending_parameter&.minimum_complete? }) do
        scope module: 'lender' do
          get '/', to: 'setup#index'

          namespace :api do
            patch '/setup', to: 'setup#update'
          end
        end
      end

      # Borrower that has not completed profile
      constraints(lambda { |request| request.env['warden'].user.borrower? && !request.env['warden'].user&.profile&.minimum_complete? }) do
        scope module: 'borrower' do
          get '/', to: 'setup#index'

          namespace :api do
            patch '/setup', to: 'setup#update'
          end
        end
      end

      # Common routes for lender with profile and borrower with profile
      constraints(lambda { |request| request.env['warden'].user.lender? || request.env['warden'].user.borrower? || request.env['warden'].user.admin? }) do
        # get '/forums', to: "forums#index"
        get '/profile', to: 'profile#edit'

        namespace :api do
          patch '/profile', to: 'profile#update'
          patch '/password', to: 'profile#update_password'
        end
      end

      # Lender with completed profile
      constraints(lambda { |request| request.env['warden'].user.lender? && request.env['warden'].user&.lending_parameter&.minimum_complete? }) do
        scope module: 'lender' do
          get '/', to: 'dashboard#index'
          get '/lending-parameters', to: 'setup#edit'

          namespace :api do
            patch '/setup', to: 'setup#update'
          end
        end
      end

      constraints(lambda { |request| request.env['warden'].user.borrower? }) do
        root 'dashboard#index', as: :authenticated_root

        scope module: 'borrower' do
          get 'loans', to: 'loan_requests#index'
          get 'loans/new', to: 'loan_requests#new'
          get 'loans/:id', to: 'loan_requests#show', as: "loan_request_show"
          get 'loans/:id/edit', to: 'loan_requests#edit', as: "loan_request_edit"

          get 'lenders', to: 'lender_organizations#index'

          get 'lenders/search', to: 'searches#index'
          get 'lenders/search/new', to: 'searches#new'
          get 'lenders/search/:id', to: 'searches#show', as: "lenders_search_show"
          get 'lenders/search/:id/edit', to: 'searches#edit', as: "lenders_search_edit"

          namespace :api do
            resources :searches, only: [:index, :create, :show, :destroy, :update] do
              get 'results', to: 'searches#results'
            end
            resources :user_saved_organizations, only: [:index, :create, :destroy]
            resources :loan_requests, only: [:index, :create, :update] do
              resources :loan_request_quotes, only: [:index, :show, :update]
              resources :loan_request_matches, only: [:index, :show, :update]
            end
          end
        end
      end

      # Admin
      constraints(lambda { |request| request.env['warden'].user.admin? }) do
        scope module: 'admin' do
          get '/entry', to: 'setup#new'
          get '/entry/:lending_parameter_id/edit', to: 'setup#edit'
          get '/entries', to: 'setup#index'

          get 'loans', to: 'loan_requests#index'
          get 'loans/new', to: 'loan_requests#new'
          get 'loans/:id', to: 'loan_requests#show', as: "admin_loan_request_show"
          get 'loans/:id/edit', to: 'loan_requests#edit', as: "admin_loan_request_edit"

          namespace :api do
            post '/setup', to: 'setup#create_lender'
            resources :lending_parameters, only: [:index, :show, :update]

            resources :loan_requests, only: [:index, :create, :update] do
              resources :loan_request_quotes, only: [:index, :show, :update]
              resources :loan_request_matches, only: [:index, :show, :update]
            end

            resources :passwords, only: [:create]
          end

          require 'slim'
          require 'sidekiq/web'
          mount Sidekiq::Web => '/sidekiq'
        end
      end
    end
  end

  root 'home#index'

  get 'registration/:user_type', to: 'public/registrations#new',
                                 constraints: lambda { |request| User::Constants::TYPES.include?(request.params[:user_type]) }
  get 'registration', to: 'public/registrations#index'

  get 'login', to: 'public/sessions#new'

  get 'password-reset', to: 'public/passwords#new'
  get 'password-reset/edit', to: 'public/passwords#edit'

  get 'terms', to: 'public/terms#terms'
  get 'privacy-policy', to: 'public/terms#privacy_policy'

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
               passwords: 'users/passwords'
             }
end
