import React from 'react';
import Card from 'react-bootstrap/Card'
import Rating from '@material-ui/lab/Rating';
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'

const ActCard = (props) => {
    let history = useHistory()
    return (
        <div style={{textAlign: 'center', padding: "4px"}}>
            <Card className='hovercard' border="info" style={{ borderRadius: '8px',width: '15rem' }}>
            <Card.Header>{props.name}</Card.Header>
            <Card.Img variant="top" src={props.photo} style={{height: '175px'}}/>
            <Card.Body>
                <Card.Text>{props.address}</Card.Text>
                <p>{props.ranking}</p>
                <Rating name="read-only" precision={0.5} value={props.rating} readOnly /><br/>
                <p><small>of {props.numrev} reviews</small></p>
                <Button variant="outline-primary" size="sm" onClick={()=> history.push(`/activity/${props.id}`)}>View</Button>{' '}
            </Card.Body>
            </Card>
        </div>
    );
}
 
export default ActCard;