import React from 'react';
import ActCard from './ActCard'

const Activity = (props) => {
    let photo = props.act.photo === undefined ? "https://elenaportfolio.azurewebsites.net/img/background1.jpg" : props.act.photo.images.original.url
    
    return (
        <div>
            <ActCard
                name={props.act.name}
                address={props.act.address}
                phone={props.act.phone}
                photo={photo}
                rating={props.act.rating}
                ranking={props.act.ranking}
                subname={props.act.subcategory.name}
                website={props.act.website}
                numrev={props.act.num_reviews}
                id={props.act.location_id}
            />
        </div>
    )
}
 
export default Activity;