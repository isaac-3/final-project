Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, :bookings, :tickets, :reservations, :trips, :events, :activities, :full_tickets, :user_trips, :experiences
  post('/login', to: 'authentication#login')
  patch('/change_date/:id', to: 'trips#change_date')
  patch('/change_name/:id', to: 'trips#change_name')
  get('/get_users/:id', to: 'trips#get_users')

end
