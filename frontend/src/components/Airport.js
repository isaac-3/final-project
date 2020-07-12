import React from 'react';
import AirCard from './AirCard'

const Airport = (props) => {
    return (
        <div>
            <AirCard
            name={props.airport.name}
            code={props.airport.code}
            city={props.airport.city}
            // id={props.airport.airportId}
            />
            
        </div>
    );
}
 
export default Airport;