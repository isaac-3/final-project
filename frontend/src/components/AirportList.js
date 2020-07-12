import React from 'react';
import Airport from './Airport'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';


const AirportList = (props) => {
    if(props.airports.length === 0){
        return  null //<CircularProgress/>
    }
    let airs = props.airports.airports.slice(1).slice(-5)
    return (
        <div style={{'display': 'flex', padding: '50px'}}>
            <CardDeck>
                {airs.map(airport => (
                    <Airport key={airport.airportId} airport={airport}/>
                ))}
            </CardDeck>
        </div>
    );
}
 
export default AirportList;