import React from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux'
import {message} from 'antd';
import { Button as Btn2, Grid, Popup } from 'semantic-ui-react'
import { Collapse } from 'antd';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RestComment from './RestComment'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Form, Button as Btn3, Input } from 'antd';
import { Comment, Avatar } from 'antd';

const { Panel } = Collapse;

const PopupExampleNested = (props) => (
    <Popup wide trigger={
    <Button 
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
        >Add To Board</Button>} 
        on='click'>
        <div style={{textAlign: 'center'}}>
            <p>{props.lastTripBoard === undefined ? "You have No Trip Board History" : "You have no current board"}</p>
            {props.lastTripBoard === undefined ? 
                <Btn2 color='red' content='Create and use board' fluid onClick={()=> {
                    fetch("http://localhost:3000/trips", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          user_id: props.user_id,
                        })
                    })
                    .then(res => res.json())
                    .then(user=>{
                        let newBoard = user.trips[user.trips.length - 1]
                        props.dispatch({ type: "NEW_BOARD", trip: newBoard})
                        props.dispatch({ type: "SET_NEW_BOARD", trip: newBoard})
                    })
                }}
                />
            :
            <Grid divided columns='equal' >
                <Grid.Column>
                <Btn2 color='blue' content='Choose A Board' fluid onClick={()=> props.history.push(`/my-trips/${props.user_id}`)}/>
                </Grid.Column>
                <Grid.Column>
                <Btn2 color='red' content='Use Last Board' fluid 
                onClick={()=>{
                    props.dispatch({type: 'USE_LAST_BOARD',trip_board: props.lastTripBoard})
                }}
                />
                </Grid.Column>
            </Grid>
            }
        </div>
    </Popup>
  )

  const { TextArea } = Input;

const RestaurantShow = () => {
    let params = useParams()
    let id = params.id
    let [rest, setRest] = useState({})
    let current_board = useSelector( state => state.trip_board)
    let user = useSelector( state => state.user)
    let dispatch = useDispatch()
    let history = useHistory()
    let [allReviews, setAllReviews] = useState([])
    let [allOthers, setAllOthers] = useState([])
    let [theComment, setTheComment] = useState('')

    let getUserProps = () => {
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(res=>res.json())
        .then(user=>(
            dispatch({ type: "USER_PROPS", user: user})
        ))
    }

    let otherRevs = (restaurant) => {
        fetch('http://localhost:3000/spec_reviews',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                restaurant: restaurant,
            })
        })
        .then(res=>res.json())
        .then(result=>(
            setAllOthers({allOthers: result})
        ))
    }

    useEffect(()=>{
        fetch(`https://tripadvisor1.p.rapidapi.com/attractions/get-details?currency=USD&lang=en_US&location_id=${id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setRest({rest: result})
            setAllReviews({allReviews: result.reviews ? result.reviews : []})
            otherRevs(result)
        })
        if(user){
            getUserProps()
        }
    },[])

    if(rest.rest === undefined || allReviews === undefined || allOthers === undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    let restaurant = rest.rest

    let newReview = (user,restaurant, theComment) => {
        if(user.id !== undefined){
            fetch('http://localhost:3000/reviews',{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    restaurant: restaurant.name,
                    user_id: user.id,
                    review: theComment
                })
            })
            .then(res=>res.json())
            .then(result=>{
                setAllOthers({allOthers: [...allOthers.allOthers, result]})
            })
            setTheComment('')
        }else{
            message.error('Must Be Logged In to Leave Review')
            setTheComment('')
        }
    }

    let handleChange = word => {
        setTheComment(word)
      };

    let lastTripBoard = user.trips !== undefined ? user.trips[user.trips.length - 1] : null
    let addToBoard = (restaurant, current_board, user_id) => {
        fetch("http://localhost:3000/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user_id,
              trip_id: current_board,
              restaurant: restaurant
            })
        })
        message.success("Successfully added")
    }

    let cBoards = user.username !== undefined && current_board !== undefined ? user.trips.filter(trip=>(
        trip.id === current_board
    )) : null

    let ccc = cBoards !== null ? cBoards[0].reservations.filter(reservation=>(
        reservation.restaurant.name === restaurant.name
    )) : null 


    let full = allReviews.allReviews && allOthers.allOthers ? allReviews.allReviews.concat(allOthers.allOthers) : undefined
    return (
        <div style={{textAlign: 'center',display:'inline-block',backgroundColor: 'rgb(223, 229, 235)', paddingTop: '24px',backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 50%,rgba(255,255,255,1)),url('/restshow.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div style={{textAlign: 'center', display:'inline-block', paddingTop: '24px'}}>
            <div style={{borderRadius: '16px',textAlign: 'center',paddingBottom: "8px", marginLeft: rest.rest.description === '' ? '450px' : '420px', paddingTop: '24px', width: '45%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', backgroundColor: 'white'}}>
                <img style={{height: '300px', width: '300px'}} src={rest.rest.photo ? rest.rest.photo.images.original.url : "https://www.bridgesdanville.com/wp-content/uploads/2020/01/kevin-gin-IMG_0021.jpg"}/>
                <h2>{rest.rest.name} {ccc === null ? null : ccc.length === 0 ? null : <CheckCircleOutlineIcon style={{fill: "green"}}/>}</h2>
                <p>Contact Information</p>
                <small><strong>{rest.rest.email ? `Email ${rest.rest.email} |` : null} Phone: {rest.rest.phone} | Adress: {rest.rest.address}</strong></small>
                <div style={{paddingTop: '24px', textAlign: 'center'}}>
                {user.id === null || user.id === undefined ?
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    disabled
                >
                    Log In To Add To Board
                </Button>
                :
                current_board === null || current_board === undefined ?
                    <PopupExampleNested restaurant={restaurant} history={history} user_id={user.id} lastTripBoard={lastTripBoard} dispatch={dispatch}/>
                    :
                    <Button 
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={()=> {
                            addToBoard(restaurant, current_board, user.id)
                        }}
                    >
                        Add To Board
                    </Button>
                    }
                </div>
            </div>
            <div style={{margin: '50px', marginBottom: '20px'}}>
                <div style={{textAlign: 'center',paddingBottom: "8px", width: '45%', float:'left',  marginRight: '16px'}}>
                    <div style={{textAlign: 'center',float: 'left', paddingRight: '16px'}}>
                        <Collapse accordion>
                            <Panel header="Meal Types" key="1">
                            {rest.rest.meal_types.length === 0 ? " . . ." : rest.rest.meal_types.map(meal => (<p>{meal.name}</p>))}
                            </Panel>
                        </Collapse>
                    </div>
                    <div style={{textAlign: 'center', paddingRight: '16px',float: 'left'}}>
                        <Collapse accordion>
                            <Panel header="Cuisine Types" key="1">
                            {rest.rest.cuisine.length === 0 ? " . . ." : rest.rest.cuisine.map(cuis => (<p>{cuis.name}</p>))}
                            </Panel>
                        </Collapse>
                    </div>
                    <div style={{textAlign: 'center',paddingRight: '16px',overflow: 'hidden', width: '200px'}}>
                        <Collapse accordion>
                            <Panel header="Dish Types" key="1">
                            {rest.rest.dishes.length === 0 ? " . . ." : rest.rest.dishes.map(dish => (<p>{dish.name}</p>))}
                            </Panel>
                        </Collapse>
                    </div>
                </div>
                <div style={{textAlign: 'center',borderRadius: '16px',textAlign: 'center', width: '50%', overflow: 'hidden', paddingLeft: rest.rest.description === '' ? '300px' : null, backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)'}}>
                    <h2>About</h2>
                    <h3 style={{fontWeight:'normal'}}>{rest.rest.description === '' ? <p>No Description</p> : rest.rest.description }</h3>
                    <p><strong>Ranking: {rest.rest.ranking}</strong></p>
                    <p>Visit Website <a href={rest.rest.website}>{rest.rest.name}</a></p>
                    <p>Prices: {rest.rest.price ? rest.rest.price : 'Contact for prices'}</p>
                </div>
            </div>
            <div style={{ paddingBottom: '24px'}}>
                <List style={{borderRadius: '16px',width: '40%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', overflow: 'auto',height: '700px' , backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', marginTop: '150px', paddingRight: '8px', paddingLeft: '8px'}} subheader={<li />}>
                <ListSubheader style={{ borderBottomStyle: 'solid',borderBottomColor: 'rgb(230, 228, 225)', width: '100%'}}>Reviews/Tips</ListSubheader>
                {full ? full.map(rev =>(
                    <RestComment review={rev}/>
                )) : null}
                    <Comment
                    avatar={
                        <Avatar
                        src={user.pic_url ? user.pic_url : "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"}
                        alt="Han Solo"
                        />
                    }
                    content={
                        <Form>
                        <Form.Item>
                        <TextArea rows={4} onChange={(e) => handleChange(e.target.value)} value={theComment}/>
                      </Form.Item>
                      <Form.Item>
                        <Btn3 htmlType="submit" type="primary" onClick={() => {
                            newReview(user,restaurant, theComment)
                        }}>
                          Add Review
                        </Btn3>
                      </Form.Item>
                      </Form>
                    }
                    />
                    </List>
                </div>
        </div>
        </div>
    );
}
 
export default RestaurantShow;