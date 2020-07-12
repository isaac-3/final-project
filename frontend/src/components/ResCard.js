import React from 'react';
import Card from 'react-bootstrap/Card'
import Rating from '@material-ui/lab/Rating';
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'


const ResCard = (props) => {
    let history = useHistory()

    return (
        <div style={{textAlign: 'center', marginBottom: '8px'}}>
            <Card className='hovercard' border="info" style={{ width: '15rem', borderRadius: '8px' }}>
            <Card.Header>{props.name}</Card.Header>
            <Card.Img variant="top" src={props.photo} style={{height: '150px'}}/>
            <ul className="list-group">
            <Card.Body>
                <p>{props.numrev} ratings:</p>
                <Rating name="read-only" precision={0.5} value={props.rating} readOnly /><br/>
                <Button variant="outline-primary" size="sm" onClick={()=> history.push(`/restaurant/${props.id}`)}>View</Button>{' '}
             </Card.Body>
             </ul>
        </Card>
        </div>
    );
}
 
export default ResCard;