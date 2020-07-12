import React from 'react';
import Geocode from "react-geocode";
import {useState,useEffect} from 'react'
import Restaurant from './Restaurant'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const AllRestaurants = () => {
    let [restaurants, setRestaurants] = useState([])
    let [address, setAddress] = useState({
        address: ''
    })

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

    let onSearch = (e) => {
        e.preventDefault();
        Geocode.fromAddress(address.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            getNewRestaurants(lat, lng)
        },
        error => {
            console.error(error);
        }
        );
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

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

    if(restaurants.length === 0){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }

    let namedRest = restaurants.restaurants.filter(r => (r.hasOwnProperty("name")))
    return (
        <div style={{paddingTop: '50px' ,textAlign: 'center', marginLeft: 'auto', backgroundColor: 'rgb(223, 229, 235)', backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 20%,rgba(255,255,255,1)),url('hothot.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
            <h1 style={{color: 'rgb(223, 229, 235)',fontSize: '60px', fontFamily: 'cursive'}}>All Restaurants</h1>
            <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}> 
                <TextField id="outlined-basic" label="Search by address" variant="outlined" style={{backgroundColor: 'rgb(223, 229, 235)'}}
                value={address.address}
                onChange={(e) => setAddress({ ...address,address: e.target.value })}
                />
                <button input="submit" style={{border: 'none', height: '53px', textDecoration: 'none', backgroundColor: 'inherit'}}><SearchIcon/></button>
            </form>
            <div style={{'display': 'flex', padding: '50px', marginLeft: '75px'}}>
                <CardDeck>
                    {namedRest.map((restaurant, index) => (
                        <Restaurant key={restaurant.location_id} restaurant={restaurant}/>
                    ))}
                </CardDeck>
            </div>
        </div>
    );
}
 
export default AllRestaurants;