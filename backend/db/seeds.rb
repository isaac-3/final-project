User.destroy_all
Trip.destroy_all
Hotel.destroy_all
Booking.destroy_all
Restaurant.destroy_all
Reservation.destroy_all
Airline.destroy_all
Ticket.destroy_all
Activity.destroy_all
Event.destroy_all
FullTicket.destroy_all
Experience.destroy_all
UserTrip.destroy_all

pics = ["https://reductress.com/wp-content/uploads/2019/12/defaultmacbackground.jpg", "https://i.huffpost.com/gen/1566612/thumbs/o-MOON-570.jpg?1", "https://wallpapercave.com/wp/wp2825596.jpg", "https://life1071.com/wp-content/themes/nwm/img/inspirational/3.jpg", "https://life979.com/wp-content/themes/nwm/img/inspirational/10.jpg"]


10.times do 
    User.create({username: Faker::Name.first_name,password: '123',address: Faker::Address.full_address,email: Faker::Internet.email, pic_url: pics.sample})
end

5.times do
    Hotel.create({name: Faker::Company.name})
end

5.times do
    Restaurant.create({name: Faker::Company.name})
end

5.times do
    Airline.create({name: Faker::Company.name})
end

5.times do
    Activity.create({name: Faker::Games::Pokemon.location})
end

# 30.times do
#     Trip.create({user_id: User.all.sample.id, trip_date: Time.now, name: Faker::Name.first_name })
# end

30.times do
    Trip.create({trip_date: Time.now, name: Faker::Name.first_name })
end

30.times do
    Booking.create({trip_id: Trip.all.sample.id, hotel_id: Hotel.all.sample.id})
end

30.times do
    Reservation.create({trip_id: Trip.all.sample.id, restaurant_id: Restaurant.all.sample.id})
end

10.times do
    FullTicket.create({trip_id: Trip.all.sample.id})
end

30.times do
    Ticket.create({full_ticket_id: FullTicket.all.sample.id, airline_id: Airline.all.sample.id})
end

30.times do
    Event.create({trip_id: Trip.all.sample.id, activity_id: Activity.all.sample.id})
end

30.times do
    UserTrip.create({user_id: User.all.sample.id, trip_id: Trip.all.sample.id})
end

5.times do
    Experience.create({trip_id: Trip.all.sample.id})
end