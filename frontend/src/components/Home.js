import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import RestaurantList from './RestaurantList'
import AirportList from './AirportList'
import ActivityList from './ActivityList'
import HotelList from './HotelList'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Geocode from "react-geocode";


const Home = () => {

    let [restaurants, setRestaurants] = useState([])
    let [airports, setAirports] = useState([])
    let [activities, setActivities] = useState([])
    let [hotels, setHotels] = useState([])

    let [address, setAddress] = useState({
        address: ''
    })
    let onSearch = (e) => {
        e.preventDefault();
        Geocode.fromAddress(address.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            getNewRestaurants(lat, lng)
            getNewActivities(lat,lng)
            getNewHotels(lat,lng)
            getNewAirports(lat,lng)
        },
        error => {
            console.error(error);
        }
        );
    }
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
    
    let getNewRestaurants = (lat, lng) => {
        fetch(`https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=${lat}&longitude=${lng}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res => res.json())
        .then(result => (
            setRestaurants({restaurants: result.data})
        ))
    }

    let getNewActivities = (lat, lng) => {
        fetch(`https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=30&distance=5&lang=en_US&longitude=${lng}&latitude=${lat}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
            })
            .then(res => res.json())
            .then(result => (
                setActivities({activities: result.data})
            ))
    }

    let getNewHotels = (lat, lng) => {
        fetch(`https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&limit=30&adults=1&amenities=pool&currency=USD&checkin=2020-08-08&subcategory=hotel&nights=2&latitude=${lat}&longitude=${lng}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
        }
        })
        .then(res=>res.json())
        .then(result=>(
        //   setHotels({hotels: result.data})
        setHotels({allHotels: result.data})
        ))
      }
    let getNewAirports = (lat, lng) => {
    fetch(`https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=50&lng=${lng}&lat=${lat}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
            "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
        }
    })
    .then(res => res.json())
    .then(result => (
        setAirports({airports: result})
    ))
    }
    
    useEffect(()=>{
        fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=29.7604&longitude=-95.3698", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res => res.json())
        .then(result => (
            setRestaurants({restaurants: result.data})
        ))
    },[])

    useEffect(()=>{
        fetch("https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=30&distance=5&lang=en_US&longitude=-95.3698&latitude=29.7604", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
        }
        })
        .then(res => res.json())
        .then(result => (
            setActivities({activities: result.data})
        ))
    },[])

    useEffect(()=>{
        fetch("https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&limit=30&adults=1&amenities=pool&currency=USD&checkin=2020-08-08&subcategory=hotel&nights=2&latitude=29.7604&longitude=-95.3698", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
        }
        })
        .then(res=>res.json())
        .then(result=>(
          setHotels({allHotels: result.data})
        ))
      },[])

    useEffect(()=>{
        fetch("https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=50&lng=-95.3698&lat=29.7604", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res => res.json())
        .then(result => (
            setAirports({airports: result})
        ))
    },[])

    return (
        <div style={{ textAlign: 'center', marginLeft: 'auto', backgroundColor: 'rgb(223, 229, 235)', backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 25%,rgba(255,255,255,1)),url('houston2.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
            <div style={{paddingTop: '48px'}}>
                <div style={{borderRadius: '16px',textAlign: 'center', width: '50%', marginLeft:'auto',marginRight:'auto', padding: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', backgroundColor: 'white', marginBottom: '24px'}} fluid>
                    <h1 style={{fontSize: '32px', fontFamily: 'cursive', padding: '16px'}}>Have A Place In Mind?</h1>
                    <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}> 
                        <TextField id="outlined-basic" label="Search by address" variant="outlined" //style={{backgroundColor: 'rgb(223, 229, 235)'}}
                        value={address.address}
                        onChange={(e) => setAddress({ ...address,address: e.target.value })}
                        />
                        <button input="submit" style={{border: 'none', height: '53px', textDecoration: 'none', backgroundColor: 'inherit'}}><SearchIcon/></button>
                    </form>
                </div>
            </div>
            <div style={{marginLeft: '90px', textAlign: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{fontSize: '32px', fontFamily: 'cursive'}}>Top Restaurants Around You</h1>
                    <RestaurantList restaurants={restaurants}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{fontSize: '32px', fontFamily: 'cursive'}}>Popular Activities Around You</h1>
                    <ActivityList activities={activities}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{fontSize: '32px', fontFamily: 'cursive'}}>Find A Hotel</h1>
                    <HotelList hotels={hotels}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{fontSize: '32px', fontFamily: 'cursive'}}>Airports Nearby</h1>
                    <AirportList airports={airports}/>
                </div>
            </div>
        </div>
        
    )
}
 
export default Home;