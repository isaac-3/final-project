import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'

const AirCard = (props) => {
    let history = useHistory()

    return (
        <div>
        <div style={{textAlign: 'center'}}>
            <Card className='hovercard' border="info" style={{ width: '15rem', borderRadius: '8px' }}>
            <Card.Header>{props.code}</Card.Header>
            <Card.Img variant="top" src="/allair.jpeg" />
            <Card.Body>
                <Card.Text>City : {props.city}</Card.Text>
                <p>Airport Name</p>
                <small><strong>{props.name}</strong></small><br/>
                <Button variant="outline-primary" size="sm" onClick={()=> history.push(`/airport/${props.code}`)}>View</Button>{' '}
            </Card.Body>
            </Card>
        </div>
        </div>
    );
}
 
export default AirCard;