Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, :bookings, :tickets, :reservations, :trips, :events, :activities, :full_tickets, :user_trips, :experiences, :reviews, :restaurants, :activity_reviews, :hotel_reviews
  post('/login', to: 'authentication#login')
  patch('/change_date/:id', to: 'trips#change_date')
  patch('/change_name/:id', to: 'trips#change_name')
  get('/get_users/:id', to: 'trips#get_users')
  post('/spec_reviews', to: 'reviews#spec_reviews')
  post('/act_reviews', to: 'activity_reviews#act_reviews')
  post('/hot_reviews', to: 'hotel_reviews#hot_reviews')



end
