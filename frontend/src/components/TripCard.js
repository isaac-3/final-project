import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Popconfirm, message } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'

function confirm(trip_board_id, book, user_id, dispatch) {
    fetch(`http://localhost:3000/trips/${trip_board_id}`,{
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user_id,
            book: book
        })
    })
    .then(res=>res.json())
    .then(user => {
        dispatch({ type: "UPD_USER",user: user })
        message.success('Succesfully Deleted!')
    })
  }
  
  function cancel(e) {
    console.log(null);
  }

const TripCard = (props) => {
    let trip_board = useSelector( state => state.trip_board)
    let currentUser = useSelector( state => state.user)

    const dispatch = useDispatch()
    let rib_name = props.book.restaurant ? 'Restaurant' : props.book.hotel ? 'Hotel' : props.book.tickets ? 'Flight' : props.book.activity ? 'Activity' : null
    let rib_icon = props.book.restaurant ? 'spoon' : props.book.hotel ? 'hotel' : props.book.tickets ? 'plane' : props.book.activity ? 'flag outline' : null
    let color = props.book.restaurant ? 'red' : props.book.hotel ? 'black' : props.book.tickets ? 'blue' : props.book.activity ? 'green' : null
    let shadowColor = 'rgba(237, 16, 0, 8)' 

    // console.log(currentUser)
    return (
        <div style={{display:'inline-block', marginRight: '8px', boxShadow: `0 4px 8px 0 ${props.book.trip_id === trip_board ? shadowColor : 'rgba(0, 0, 0, 4)' }, 0 6px 30px 0 rgba(0, 0, 0, 0.19)`, borderRadius: '8px', marginBottom: '8px'}}>
            <Card border="dark" style={{ width: '15rem', height: '450px', borderRadius: '8px', paddingTop: '24px'}} hoverable>
            <Image fluid label={{ as: 'a', color: color, content: rib_name, icon: rib_icon, ribbon: true, }} src='https://www.vippng.com/png/detail/103-1036999_car-travel-road-trip-comments-road-trip-icon.png' />
            <Card.Body>
                <p style={{display: props.book.restaurant ? null : 'none'}}>{props.book.restaurant ? 'Restaurant Name: ' : null}</p>
                <p style={{display: props.book.hotel ? null : 'none'}}>{props.book.hotel ? 'Hotel Name: ' : null}</p>
                <p style={{display: props.book.activity ? null : 'none'}}>{props.book.activity ? 'Activity Name: ' : null}</p>
                <p style={{display: props.book.restaurant ? null : 'none'}}>{props.book.restaurant ? props.book.restaurant.name : null}</p>
                <p style={{display: props.book.hotel ? null : 'none'}}>{props.book.hotel ? props.book.hotel.name : null}</p>
                <p style={{display: props.book.activity ? null : 'none'}}>{props.book.activity ? props.book.activity.name : null}</p>
                {props.book.tickets !== undefined ? props.book.tickets.slice(0, 2).map((tick, index)=>(
                    <div>
                    <p><strong>{index === 0 ? 'Departure City:' : 'Return City:'}</strong></p>
                    <small><strong>{tick.airline.name}</strong></small><br/>
                    <br/>
                    </div>
                )) : null}
                {props.book.trip_id === trip_board ?
                <Button
                size='small'
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                >
                <Popconfirm
                    title="Are you sure delete this?"
                    onConfirm={()=> confirm(trip_board, props.book, currentUser.id, dispatch)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >Delete</Popconfirm>
                </Button> : <p style={{display: props.book.trip_id === trip_board ? 'none' : null}}></p>
                }
             </Card.Body>
            </Card>
        </div>
    );
}
 
export default TripCard;