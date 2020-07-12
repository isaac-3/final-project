import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Switch} from 'react-router-dom'
import { Route } from 'react-router'
import Test from './components/Test'
import Home from './components/Home'
import Navbar2 from './components/NavBar2'
import RestaurantShow from './components/RestaurantShow'
import AirShow from './components/AirShow'
import ActShow from './components/ActShow'
import Index from './components/Index'
import MyTrips from './components/MyTrips'
import MyProfile from './components/MyProfile'
import AllAirports from './components/AllAirports'
import AllRestaurants from './components/AllRestaurants'
import AllHotels from './components/AllHotels'
import AllActivities from './components/AllActivities'
import HotelShow from './components/HotelShow'
import TripShow from './components/TripShow'
import UserExp from './components/UserExp'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar2/>
        <Switch>
          {/* <Route exact path='/' component={Index}/> */}
          <Route exact path='/' component={Home}/>
          <Route exact path='/my-profile' component={MyProfile}/>
          <Route exact path='/restaurant/:id' component={RestaurantShow}/>
          <Route exact path='/airport/:id' component={AirShow}/>
          <Route exact path='/activity/:id' component={ActShow}/>
          <Route exact path='/my-trips/:id' component={MyTrips}/>
          <Route exact path='/hotel/:id' component={HotelShow}/>
          <Route exact path='/trip/:id' component={TripShow}/>
          <Route exact path="/airports" component={AllAirports} />
          <Route exact path='/restaurants' component={AllRestaurants}/>
          <Route exact path='/hotels' component={AllHotels}/>
          <Route exact path='/activities' component={AllActivities}/>
          <Route exact path='/experiences' component={UserExp}/>
          <Route exact path='/test' component={Test}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;