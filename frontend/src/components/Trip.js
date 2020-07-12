import React from 'react';
import {useState, useEffect} from 'react'
import {Header } from 'semantic-ui-react'
import TripCard from './TripCard'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import { Popconfirm, message } from 'antd'
import { Empty } from 'antd';
import {useHistory} from 'react-router-dom'
import { Avatar, Tooltip } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';

function confirm(trip_id, user_id, dispatch, trip_board) {
    // console.log(trip_id === trip_board)
    fetch(`http://localhost:3000/trips/${trip_id}`,{
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user_id
        })
    })
    .then(res => res.json())
    .then(user => {
        if(trip_id === trip_board){
            dispatch({ type: 'SET_BOARD_TO_UNDEFINED' })
        }
        dispatch({ type: "DELETE_TRIP_BOARD",trips: user.trips })
        message.success('Succesfully Deleted!')
    })
  }
  
  function cancel(e) {
    console.log(null);
  }

const Trip = (props) => {

    let history = useHistory()

    let trip_board = useSelector( state => state.trip_board)
    const dispatch = useDispatch()
    let currentUser = useSelector( state => state.user)

    let [tripUsers, setTripUsers] = useState()
    let [allExp, setAllExp] = useState()

    useEffect(()=>{
        fetch(`http://localhost:3000/get_users/${props.trip.id}`)
        .then(res=>res.json())
        .then(tripusers => (
            setTripUsers(tripusers)
        ))
    },[])

    useEffect(()=>{
        fetch('http://localhost:3000/experiences')
        .then(res=>res.json())
        .then(exp => (
            setAllExp(exp)
        ))
    },[])

    if(tripUsers === undefined || allExp === undefined){
        // return <div style={{textAlign: 'center'}}><CircularProgress/></div>
        return null
    }

    let shareExp = (trip) => {
        if(props.trip.bookings.length === 0 && props.trip.reservations.length === 0 && props.trip.full_tickets.length === 0 && props.trip.events.length === 0){
            message.error('Empty Baord. Nothing to Share')
        }else{
            fetch("http://localhost:3000/experiences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                trip: trip
                })
            })
            message.success('Succesfully Shared!')
        }
    }

    let filt = allExp.filter(exp=>(
        exp.trip_id === props.trip.id
    ))

    let color = filt.length !== 0 ? 'rgb(155, 163, 179)' : 'green'
    // console.log(filt)
    return (
        <div style={{paddingBottom: '32px'}}>
            <div style={{textAlign: 'center', 'marginTop': '50px', width: 'fit-content', 'marginLeft':'auto','marginRight':'auto'}} fluid>
                {props.trip.bookings.length === 0 && props.trip.reservations.length === 0 && props.trip.full_tickets.length === 0 && props.trip.events.length === 0 ?
                <div>
                <Header color={props.trip.id === trip_board ? 'green': null} style={{fontSize: '24px', fontFamily: 'cursive'}}>Trip Date: {props.trip.trip_date.substring(0,10)}</Header>
                <Header>
                     {tripUsers.map(user => (
                         <Tooltip title={user.username} color={user.id === currentUser.id ? 'red' : 'blue'}>
                            <Avatar src={user.pic_url ? user.pic_url : "https://i0.wp.com/cms.ironk12.org/wp-content/uploads/2020/02/no-person-profile-pic.png?ssl=1"} gap={4}/>
                        </Tooltip>
                    ))} 
                </Header>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{width: '200px'}}/>
                </div>
                :
                <div>
                <Header style={{fontSize: '24px', fontFamily: 'cursive',color: 'rgb(223, 229, 235)'}}>Title: {props.trip.name ? <strong style={{color: 'green'}}>{props.trip.name}</strong> : <strong style={{color: 'green'}}>'Your Trip Awaits'</strong>} Trip Date: {props.trip.trip_date === undefined ?  'No Date Set': <span style={{color: 'green'}}>{props.trip.trip_date.substring(0,10)}</span>}</Header>
                <Header>
                     {tripUsers.map(user => (
                         <Tooltip title={user.username} color={user.id === currentUser.id ? 'red' : 'blue'}>
                            <Avatar src={user.pic_url ? user.pic_url : "https://i0.wp.com/cms.ironk12.org/wp-content/uploads/2020/02/no-person-profile-pic.png?ssl=1"} gap={4}/>
                        </Tooltip>
                    ))} 
                </Header>
                {props.trip.bookings.map(book => (
                    <TripCard key={book.id} user_id={props.trip.user_id} book={book}/>
                ))}
                {props.trip.reservations.map(book => (
                    <TripCard key={book.id} user_id={props.trip.user_id} book={book}/>
                ))}
                {props.trip.full_tickets.map(book => (
                        <TripCard key={book.id} user_id={props.trip.user_id} book={book}/>
                ))}
                {props.trip.events.map(book => (
                    <TripCard key={book.id} user_id={props.trip.user_id} book={book}/>
                ))}
                <br/>
                </div>
                }
            </div>
            <br/>
            <div>
                <Button variant="contained" size="small" style={{marginRight:'4px', backgroundColor: 'rgb(48, 120, 242)', color: 'white'}} onClick={()=> dispatch({ type: "SET_TRIP", trip: props.trip})}>
                    Set As Current Trip Board
                </Button>
                <Button variant="contained" size="small" style={{marginRight:'4px', backgroundColor: 'rgb(48, 120, 242)', color: 'white'}} onClick={()=>{
                    history.push(`/trip/${props.trip.id}`)
                    dispatch({ type: "SET_TRIP", trip: props.trip})
                }}>
                    View/Edit
                </Button>
                <Button variant="contained" size="small" style={{marginRight:'4px', backgroundColor: color, color: 'white'}}
                disabled={filt.length !== 0 ? true : false}
                onClick={()=>{
                    shareExp(props.trip)
                }}>
                    {filt.length !== 0 ? "Already Shared" : "Share Experience"}
                </Button>
                <Button variant="contained" color="secondary" size="small" style={{marginRight:'4px'}} startIcon={<DeleteIcon />} >
                <Popconfirm
                    title="Are you sure delete this?"
                    onConfirm={() => confirm(props.trip.id, currentUser.id, dispatch, trip_board)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >Delete</Popconfirm>
                </Button>
            </div>
        </div>
    );
}
 
export default Trip;