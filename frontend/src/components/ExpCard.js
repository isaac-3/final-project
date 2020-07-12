import React from 'react';
import { Avatar, Tooltip } from 'antd';
import {Header } from 'semantic-ui-react'
import Experience from './Experience'
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';

const ExpCard = (props) => {
    let [tripUsers, setTripUsers] = useState({})
    let currentUser = useSelector( state => state.user)

    useEffect(() => {
        fetch(`http://localhost:3000/trips/${props.exp.trip.id}`)
        .then(res=>res.json())
        .then(trip => {
            setTripUsers({tripUsers: trip.users})
        })
    },[])

    if(tripUsers.tripUsers === undefined){
        return null
    }

    return (
        <div style={{textAlign: 'center', 'marginTop': '50px', width: 'fit-content', 'marginLeft':'auto','marginRight':'auto'}} fluid>
        {tripUsers.tripUsers.length !== 0 ?
        <div>
        {props.exp.trip.bookings.length === 0 && props.exp.trip.reservations.length === 0 && props.exp.trip.full_tickets.length === 0 && props.exp.trip.events.length === 0 ?
        null
        // <div>
        // <Header>Trip Date: {props.exp.trip.trip_date.substring(0,10)}</Header>
        // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{width: '200px'}}/>
        // </div>
        :
        <div>
            {/* { Trip Date: {props.exp.trip.trip_date.substring(0,10)}} */}
        <Header style={{fontSize: '32px', fontFamily: 'cursive'}}>Name: {props.exp.trip.name}</Header>
        <Header>
             {tripUsers.tripUsers.map(user => (
                 <Tooltip title={user.username} color={user.id === currentUser.id ? 'red' : 'blue'}>
                    <Avatar src={user.pic_url ? user.pic_url : "https://i0.wp.com/cms.ironk12.org/wp-content/uploads/2020/02/no-person-profile-pic.png?ssl=1"} gap={4}/>
                </Tooltip>
            ))} 
        </Header>
        {props.exp.trip.bookings.map(book => (
            <Experience key={book.id} book={book}/>
        ))}
        {props.exp.trip.reservations.map(book => (
            <Experience key={book.id} book={book}/>
        ))}
        {props.exp.trip.full_tickets.map(book => (
                <Experience key={book.id} book={book}/>
        ))}
        {props.exp.trip.events.map(book => (
            <Experience key={book.id} book={book}/>
        ))}
        <br/>
        </div>
        }</div> : null}
    </div>
    );
}
 
export default ExpCard;