import React from 'react';
import Restaurant from './Restaurant'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';

const RestaurantList = (props) => {
    if(props.restaurants.length === 0){
        return null //<CircularProgress />
    }
    let filt = props.restaurants.restaurants.filter(r => (r.hasOwnProperty("name")))
    let sorted = filt.sort((a, b) => parseFloat(a.rating) > parseFloat(b.rating) ? 1 : -1)
    let newone = sorted.sort((a, b) => parseFloat(a.num_reviews) > parseFloat(b.num_reviews) ? 1 : -1).slice(1).slice(-5).reverse()

    return (
        <div style={{'display': 'flex', padding: '50px'}}>
        <CardDeck>
            {newone.map((restaurant, index) => (
                <Restaurant key={restaurant.location_id} restaurant={restaurant}/>
            ))}
        </CardDeck>
        </div>
    );
}
 
export default RestaurantList;