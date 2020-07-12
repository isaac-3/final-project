import React from 'react';
import Card from 'react-bootstrap/Card'
import Rating from '@material-ui/lab/Rating';
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'

const HotelCard = (props) => {
    let history = useHistory()

    return (
        <div>
        <div style={{textAlign: 'center', padding: '4px'}}>
            <Card className='hovercard' border="info" style={{ width: '15rem', borderRadius: '8px' }}>
            <Card.Header>{props.name}</Card.Header>
            <Card.Img variant="top" src={props.photo} />
            <ul className="list-group">
            <Card.Body>
                <Rating name="read-only" precision={0.5} value={props.rating} readOnly /><br/>
                <p>of {props.num_reviews} ratings</p>
                <p>{props.price}</p>
                <Button variant="outline-primary" size="sm" onClick={()=> history.push(`/hotel/${props.id}`)}>View</Button>{' '}
             </Card.Body>
             </ul>
        </Card>
        </div>
        </div>
    );
}
 
export default HotelCard;