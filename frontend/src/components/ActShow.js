import React from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux'
import {message} from 'antd';
import { Button as Btn2, Grid, Popup } from 'semantic-ui-react'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import ActivityComment from './ActivityComment'
import Rating from '@material-ui/lab/Rating';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Form, Button as Btn3, Input } from 'antd';
import { Comment, Tooltip, Avatar } from 'antd';

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

const AirShow = () => {
    let params = useParams()
    let id = params.id
    let [act, setActivity] = useState({})
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

    let otherRevs = (activity) => {
        fetch('http://localhost:3000/act_reviews',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                activity: activity.name,
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
            setActivity({act: result})
            setAllReviews({allReviews: result.reviews ? result.reviews : []})
            otherRevs(result)
        })
        if(user){
            getUserProps()
        }
    },[])
    if(act.act === undefined || allReviews === undefined || allOthers === undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    let activity = act.act

    let newReview = (user, activity, theComment) => {
        if(user.id !== undefined){
            fetch('http://localhost:3000/activity_reviews',{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    activity: activity.name,
                    user_id: user.id,
                    review: theComment
                })
            })
            .then(res=>res.json())
            .then(result=>(
                setAllOthers({allOthers: [...allOthers.allOthers, result]})
            ))
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
    let addToBoard = (activity, current_board, user_id) => {
        fetch("http://localhost:3000/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user_id,
              trip_id: current_board,
              activity: activity
            })
        })
        message.success("Successfully added")
    }

    let cBoards = user.username !== undefined && current_board !== undefined ? user.trips.filter(trip=>(
        trip.id === current_board
    )) : null

    let ccc = cBoards !== null ? cBoards[0].events.filter(event=>(
        event.activity.name === activity.name
    )) : null 

    let full = allReviews.allReviews && allOthers.allOthers ? allReviews.allReviews.concat(allOthers.allOthers) : undefined

    return (
        <div style={{backgroundColor: 'rgb(223, 229, 235)', paddingTop: '24px',backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 30%,rgba(255,255,255,1)),url('/actshow.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div style={{textAlign: 'center' }}>
            <div style={{borderRadius: '16px',textAlign: 'center', width: 'fit-content', marginLeft:'auto',marginRight:'auto', padding: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', backgroundColor: 'white', marginBottom: '24px'}} fluid>
                <img style={{height: '300px'}} src={act.act.photo === undefined ? "https://elenaportfolio.azurewebsites.net/img/background1.jpg" : act.act.photo.images.large.url}/>
                <h2>{activity.name} {ccc === null ? null : ccc.length === 0 ? null : <CheckCircleOutlineIcon style={{fill: "green"}}/>}</h2>
                <p>Contact Information</p>
                <small><strong>{activity.email ? `Email ${activity.email} |` : null} {activity.phone ? `Phone: ${activity.phone} |`: null} Adress: {activity.address}</strong></small>
                <div style={{marginTop: '24px', textAlign: 'center'}}>
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
                        <PopupExampleNested activity={activity} history={history} user_id={user.id} lastTripBoard={lastTripBoard} dispatch={dispatch}/>
                        :
                        <Button 
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon />}
                            onClick={()=> {
                                addToBoard(activity, current_board, user.id)
                            }}
                        >
                            Add To Board
                        </Button>
                    }
                </div>
            </div>
            <div style={{borderRadius: '16px',display:'inline-block', textAlign: 'center', paddingnTop: '50px', width: '50%', marginLeft:'auto',marginRight:'auto', backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)'}} fluid>
                    <Rating name="read-only" precision={0.5} value={parseFloat(activity.rating)} readOnly /><br/>
                    {activity.num_reviews ? <small><strong> of {act.act.num_reviews} reviews</strong></small> : <p style={{display: 'none'}}>hidden</p>}
                    <h2>About</h2>
                    <h3 style={{fontWeight:'normal'}}>{activity.description === '' ? <p>No Description</p> : activity.description }</h3>
                    {activity.subcategory === undefined ? <p style={{display: 'none'}}>hidden</p>
                    :
                    activity.subcategory.map(cat=>(
                        <h4>{cat.name}</h4>
                    ))}
                    {activity.ranking ? <p><strong>Ranking: {activity.ranking}</strong></p> :  <p style={{display: 'none'}}>hidden</p>}
                    <p><strong>Our Prices: {activity.price ? activity.price : 'Contact For Price'}</strong></p>
                    {activity.website ? <p>Visit Website <a href={activity.website}>{activity.name}</a></p> : <p style={{display: 'none'}}>hidden</p>}
            </div>
            <div style={{ paddingnBottom: '24px'}}>         
                <List style={{borderRadius: '16px',width: '40%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', overflow: 'auto',height: '700px' , backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', paddingRight: '8px', paddingLeft: '8px'}} subheader={<li />}>
                <ListSubheader style={{ borderBottomStyle: 'solid',borderBottomColor: 'rgb(230, 228, 225)', width: '100%'}}>Reviews/Tips</ListSubheader>
                {full ? full.map(rev =>(
                    <ActivityComment review={rev}/>
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
                        <Btn3 htmlType="submit" type="primary" onClick={() => newReview(user,activity, theComment)}>
                          Add Review
                        </Btn3>
                      </Form.Item>
                      </Form>
                    }
                    />
                    </List>
            </div>
            <div style={{display:'inline-block', textAlign: 'center', 'marginTop': '50px', width: 'fit-content', marginLeft:'auto',marginRight:'auto', padding: '8px'}} fluid>
                <CardDeck>{activity.awards ? activity.awards.map(award=>(
                <div style={{display:'inline-block', textAlign: 'center', 'marginTop': '50px', width: 'fit-content', marginLeft:'auto',marginRight:'auto'}} fluid>
                <Card border="warning" style={{ width: '18rem' }}>
                <Card.Header>{award.award_type}</Card.Header>
                    <Card.Body>
                    <Card.Title>{award.year}</Card.Title>
                    </Card.Body>
                </Card>
                </div>
                )) : null}
                </CardDeck>
            </div>
            <br/>
        </div>
        </div>
    );
}
 
export default AirShow;