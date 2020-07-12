import React from 'react';
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Geocode from "react-geocode";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'


 const AllAirports = () => {
  let history = useHistory()

  let [allAirports, setAirports] = useState([])
  let [address, setAddress] = useState({
    address: ''
  })

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

  let onSearch = (e) => {
    e.preventDefault();
    Geocode.fromAddress(address.address).then(
    response => {
        const { lat, lng } = response.results[0].geometry.location;
        getNewAirports(lat, lng)
    },
    error => {
        console.error(error);
    }
    );
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
        setAirports({allAirports: result})
    ))
  }
    useEffect(()=>{
      console.log('nope')
      fetch("https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=50&lng=-95.3698&lat=29.7604", {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
              "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
          }
      })
      .then(res => res.json())
      .then(result => (
        console.log(result)
          // setAirports({allAirports: result})
      ))
    },[])

    if(allAirports.allAirports === undefined){
      return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }

    console.log(allAirports.allAirports)
   return (
    <div style={{textAlign: 'center',backgroundColor: 'rgb(223, 229, 235)', paddingTop: '24px',backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 20%,rgba(255,255,255,1)),url('/airplane.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <h1 style={{fontSize: '60px', fontFamily: 'cursive'}}>All Airports</h1>
        <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}>
          <TextField id="outlined-basic" label="Search by address" variant="outlined"
          value={address.address}
          onChange={(e) => setAddress({ ...address,address: e.target.value })}
          />
          <button input="submit" style={{border: 'none',backgroundColor: 'transparent', height: '53px', textDecoration: 'none'}}><SearchIcon/></button>
        </form>
       <table style={{borderCollapse: 'collapse', width: '70%', height: '200px', margin: 'auto', marginTop: '100px'}}>
        <tr  style={{padding: '8px',textAlign: 'center', borderBottom: '1px solid blue'}}>
          <th>Name</th>
          <th>Code</th>
          <th>City</th>
          <th>View</th>
        </tr>
        {allAirports.allAirports.map(airport => {
                return <tr  style={{padding: '8px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>
                  <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>{airport.name}</td>
                  <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>{airport.code}</td>
                  <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>{airport.city}</td>
                  <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}><Button variant="outline-primary" size="sm" onClick={()=> history.push(`/airport/${airport.code}`)}>View</Button>{' '}</td>
                </tr>
        })}
      </table>
     </div>
   );
 }
  
 export default AllAirports;