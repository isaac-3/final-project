import React from 'react';
// import Geocode from "react-geocode";
// import {useState, useEffect} from 'react'
import HotelComment from './HotelComment'

const Index = () => {

    // let [address, setAddress] = useState({
    //     address: ''
    // })
    // Geocode.setApiKey("AIzaSyDJvg5WPlOh_7Y6IHPCItqZTVQTCpC9aqs");
    // Geocode.enableDebug();
    
    // let onSearch = (e) => {
    //     e.preventDefault();
    //     Geocode.fromAddress(address.address).then(
    //     response => {
    //         const { lat, lng } = response.results[0].geometry.location;
    //         console.log(lat, lng);
    //     },
    //     error => {
    //         console.error(error);
    //     }
    //     );
    // }

    // console.log(address.address)

    return (
        <div style={{textAlign: 'center'}}>
            <h1>
                APP TITLE
            </h1>
            {/* <input 
                value={address.address}
                onChange={(e) => setAddress({ ...address,address: e.target.value })}
            />
            <button onClick={onSearch}>Search</button> */}
        </div>
    );
}
 
export default Index;