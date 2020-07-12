import React from 'react';
import ResCard from './ResCard'

const Restaurant = (props) => {
    let photo = props.restaurant.photo === undefined ? "https://i.pinimg.com/originals/de/20/60/de206017ca2c2ce1c5458c71225a1cb2.jpg" : props.restaurant.photo.images.small.url
    let rating = parseFloat(props.restaurant.rating)
    return (
        <div>
            <ResCard
                id={props.restaurant.location_id}
                name={props.restaurant.name}
                address={props.restaurant.address}
                cuisine={props.restaurant.cuisine}
                photo={photo}
                rating={rating}
                numrev={props.restaurant.num_reviews}
            />
        </div>
    );
}
 
export default Restaurant;