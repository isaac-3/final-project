import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Trip from './Trip'
import { Empty, Button as Button2 } from 'antd';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Button from '@material-ui/core/Button';

const MyTrips = () => {
    let params = useParams()
    let id = params.id
    let dispatch = useDispatch()

    let scrollToBottom = () => {
        window.scrollTo(0,document.body.scrollHeight)
    }

    useEffect(()=>{
        fetch(`http://localhost:3000/users/${id}`)
        .then(res=>res.json())
        .then(user=>(
            dispatch({ type: "USER_PROPS", user: user})
        ))
    },[])

    let newTripBoard = (id) => {
        fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: id,
            })
        })
        .then(res => res.json())
        .then(user=>{
            let newBoard = user.trips[user.trips.length - 1]
            dispatch({ type: "NEW_BOARD", trip: newBoard})
            dispatch({ type: "SET_NEW_BOARD", trip: newBoard})
            scrollToBottom()
        })
    }
    let loggedUser = useSelector( state => state.user)
    if(loggedUser.trips=== undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    if(loggedUser.trips.length === 0){
        return <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
            height: 60,
            }}
            description={
            <span>
                You have no trips
            </span>
            }
        >
            <Button2 type="primary" onClick={() => newTripBoard(loggedUser.id)}>Create Now</Button2>
        </Empty>
    }
    return (
        <div style={{ textAlign: 'center', marginLeft: 'auto',paddingTop: '50px', backgroundColor: 'rgb(223, 229, 235)', backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 20%,rgba(255,255,255,1)),url('/yourtrips.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
            <div style={{textAlign: 'center'}}>
                    {loggedUser.trips.map(trip => (
                        <Trip key={trip.id} trip={trip}/>
                    ))}
            </div>
            <Button variant="contained" color="primary" 
            style={{backgroundColor: 'blue', position: 'fixed', bottom: '25px', right: '25px'}}
            onClick={() => newTripBoard(loggedUser.id)}
            >
                <AddBoxRoundedIcon /> Start A New Trip
            </Button>
        </div>
    );
}
 
export default MyTrips;