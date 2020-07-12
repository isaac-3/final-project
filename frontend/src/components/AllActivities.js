import React from 'react';
import Geocode from "react-geocode";
import {useState,useEffect} from 'react'
import Activity from './Activity'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const AllActivities = () => {
    let [activities, setActivities] = useState([])
    let [address, setAddress] = useState({
        address: ''
    })

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

    let onSearch = (e) => {
        e.preventDefault();
        Geocode.fromAddress(address.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            getNewActivities(lat, lng)
        },
        error => {
            console.error(error);
        }
        );
    }

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
    // Geocode.enableDebug();

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

    if(activities.length === 0){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }

    let namedAct = activities.activities.filter(r => (r.hasOwnProperty("name")))
    let difActsId = namedAct.filter(act => (
        act.location_id !== '0'
    ))
    return (
        <div style={{ textAlign: 'center', marginLeft: 'auto', backgroundColor: 'rgb(223, 229, 235)', backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 20%,rgba(255,255,255,1)),url('/actspage.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div style={{textAlign: 'center', paddingTop: '90px'}}>
            <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}>
                <h1 style={{color: 'rgb(223, 229, 235)', fontSize: '60px', fontFamily: 'cursive'}}>All Activities</h1>
                <TextField id="outlined-basic" label="Search by address" variant="outlined" style={{backgroundColor: 'rgb(223, 229, 235)'}}
                value={address.address}
                onChange={(e) => setAddress({ ...address,address: e.target.value })}
                />
                <button input="submit" style={{border: 'none',backgroundColor: 'inherit', height: '53px', textDecoration: 'none'}}><SearchIcon/></button>
            </form>
            <div style={{'display': 'flex', padding: '50px', marginLeft: '75px'}}>
                <CardDeck>
                    {difActsId.map((act, index) => (
                        <Activity key={act.location_id} act={act}/>
                    ))}
                </CardDeck>
            </div>
        </div>
        </div>
    );
}
 
export default AllActivities;