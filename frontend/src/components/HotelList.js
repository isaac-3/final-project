import React from 'react';
import Hotel from './Hotel'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';

const HotelList = (props) => {
    if(props.hotels.length === 0){
        return null //<div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    let newfilt = props.hotels.allHotels
    let sorted = newfilt.sort((a, b) => parseFloat(a.rating) < parseFloat(b.rating) ? 1 : -1).slice(0, 5)
    return (
        <div style={{'display': 'flex', padding: '50px'}}>
            <CardDeck>
                {sorted.map(hotel => (
                    <Hotel key={hotel.location_id} hotel={hotel}/>
                ))}
            </CardDeck>
        </div>
    );
}
 
export default HotelList;