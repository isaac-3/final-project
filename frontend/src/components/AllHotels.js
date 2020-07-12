import React from 'react';
import Geocode from "react-geocode";
import {useState, useEffect} from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';
import Hotel from './Hotel'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const AllHotels = () => {

  let [allHotels, setHotels] = useState([])
  let [address, setAddress] = useState({
    address: ''
  })

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
      setHotels({allHotels: result.data})
    ))
  }

  let onSearch = (e) => {
    e.preventDefault();
    Geocode.fromAddress(address.address).then(
    response => {
        const { lat, lng } = response.results[0].geometry.location;
        getNewHotels(lat, lng)
    },
    error => {
        console.error(error);
    }
    );
}

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

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

  if(allHotels.allHotels === undefined){
    return <div style={{textAlign: 'center'}}><CircularProgress/></div>
  }

  return (
    <div style={{textAlign: 'center',backgroundColor: 'rgb(223, 229, 235)', paddingTop: '24px',backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 30%,rgba(255,255,255,1)),url('/hhh.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <h1 style={{fontSize: '60px', fontFamily: 'cursive'}}>All Hotels</h1>
        <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}>
            <TextField id="outlined-basic" label="Search by address" variant="outlined" style={{backgroundColor: 'rgb(223, 229, 235)'}}
            value={address.address}
            onChange={(e) => setAddress({ ...address,address: e.target.value })}
            />
            <button input="submit" style={{border: 'none',backgroundColor: 'inherit', height: '53px', textDecoration: 'none'}}><SearchIcon/></button>
        </form>
        <div style={{'display': 'flex', padding: '50px', marginLeft: '75px'}}>
          <CardDeck>
              {allHotels.allHotels.map((hotel, index) => (
                  <Hotel key={hotel.location_id} hotel={hotel}/>
              ))}
          </CardDeck>
        </div>
    </div>
  );
}
 
export default AllHotels;