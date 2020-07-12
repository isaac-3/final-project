import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const WeatherCard = (props) => {
    console.log(props)
    return (
        <div>
        {props.first.map(weather => (
            <div style={{display:'inline-block', textAlign: 'center', float: 'left'}}>
                {/* {console.log(weather.weather.description)} */}
                <Card border="dark" style={{ width: '9rem',height: '350px' }}>
                <Card.Header style={{color: 'black'}}>{weather.datetime.substring(0,10)}</Card.Header>
                <Card.Img variant="top" style={{height: '150px'}} src="https://cdn4.iconfinder.com/data/icons/weather-forecast-filled-outline-1/64/clouds_weather_weather_forecast-256.png" />
                <Card.Body>
                <Card.Text style={{color: 'black'}}>Max. Temp: <strong style={{color: 'green'}}>{Math.floor(weather.max_temp * 9 / 5 + 32)}</strong></Card.Text>
                <Card.Text style={{color: 'black'}}>Min. Temp: <strong style={{color: 'green'}}>{Math.floor(weather.min_temp * 9 / 5 + 32)}</strong></Card.Text>
                <small style={{color: 'black'}}><strong>Description</strong></small>
                <Card.Text style={{color: 'black'}}>{weather.weather.description}</Card.Text>
                </Card.Body>
                </Card>
                </div>
            ))}
            </div>
    );
}
 
export default WeatherCard;




{/* <Button variant="outline-primary" size="sm">View</Button>{' '} */}