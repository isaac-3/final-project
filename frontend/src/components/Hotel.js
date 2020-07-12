import React from 'react';
import HotelCard from './HotelCard'

const Hotel = (props) => {
    let photo = props.hotel.photo.images.medium.url !== undefined && props.hotel.photo.images.medium.url !== null ? props.hotel.photo.images.medium.url : "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp"
    let rating = parseFloat(props.hotel.rating)
    return (
        <div>
            <HotelCard
                id={props.hotel.location_id}
                name={props.hotel.name}
                photo={photo}
                num_reviews={props.hotel.num_reviews}
                price={props.hotel.price}
                ranking={props.hotel.ranking}
                rating={rating}
            />
        </div>
    );
}
 
export default Hotel;