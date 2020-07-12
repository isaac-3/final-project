import React from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Button as Btn2, Grid, Popup } from 'semantic-ui-react'
import {message} from 'antd';
import HotelComment from './HotelComment'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)',
      overflow: 'auto',
      height: '500px',
      borderRadius: '8px',
      paddingRight: '8px',
      paddingLeft: '8px'
    },
    root2: {
        width: '30%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)',
        overflow: 'auto',
        height: '500px',
        float: 'left',
        borderRadius: '8px',
        paddingRight: '8px', 
        paddingLeft: '8px'
      },
  }));
const HotelShow = () => {
    const classes = useStyles();

    let params = useParams()
    let id = params.id
    let current_board = useSelector( state => state.trip_board)
    let user = useSelector( state => state.user)
    let dispatch = useDispatch()
    let history = useHistory()
    let [hotel, setHotel] = useState({}) 
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

    let otherRevs = (hotel) => {
        // console.log(hotel[0])
        fetch('http://localhost:3000/hot_reviews',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hotel: hotel.name,
            })
        })
        .then(res=>res.json())
        .then(result=>(
            setAllOthers({allOthers: result})
        ))
    }

    useEffect(()=>{
        fetch(`https://tripadvisor1.p.rapidapi.com/hotels/get-details?adults=1&nights=2&currency=USD&lang=en_US&checkin=2020-08-08&location_id=${id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setHotel({hotel: result.data})
            setAllReviews({allReviews: result.data[0].room_tips ? result.data[0].room_tips : []})
            otherRevs(result.data[0])
        })
        if(user){
            getUserProps()
        }
    },[])
    if(hotel.hotel === undefined || allReviews === undefined || allOthers === undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }

    let theHotel = hotel.hotel[0]

    let newReview = (user, hotel, theComment) => {
        if(user.id !== undefined){
            fetch('http://localhost:3000/hotel_reviews',{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    hotel: hotel.name,
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
    let addToBoard = (hotel, current_board, user_id) => {
        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user_id,
              trip_id: current_board,
              hotel: hotel
            })
        })
        message.success("Successfully added")
    }

    let cBoards = user.username !== undefined && current_board !== undefined? user.trips.filter(trip=>(
        trip.id === current_board
    )) : null

    let ccc = cBoards !== null ? cBoards[0].bookings.filter(booking=>(
        booking.hotel.name === theHotel.name
    )) : null 

    let full = allReviews.allReviews && allOthers.allOthers ? allReviews.allReviews.concat(allOthers.allOthers) : undefined
    return (
    <div style={{textAlign: 'center',display:'inline-block',backgroundColor: 'rgb(223, 229, 235)', paddingTop: '24px',backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 50%,rgba(255,255,255,1)),url('/spa.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>

        {/* <div style={{textAlign: 'center', display:'inline-block', paddingTop: '50px', backgroundColor: 'rgb(223, 229, 235)'}}> */}
            <div style={{margin: '50px', marginBottom: '20px'}}>
                <div style={{textAlign: 'center',paddingBottom: "8px",borderRadius: '8px', width: '45%', float:'left', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', marginRight: '16px', backgroundColor: 'white'}}>
                    <img style={{height: '300px'}} src={theHotel.photo.images.original.url !== null && theHotel.photo.images.original.url !== undefined ? theHotel.photo.images.original.url : "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp"}/>
                    <h2>{theHotel.name} {ccc === null ? null : ccc.length === 0 ? null : <CheckCircleOutlineIcon style={{fill: "green"}}/>}</h2>
                    <p>Contact Information</p>
                    <small><strong>{theHotel.email ? `Email ${theHotel.email} |` : null} Phone: {theHotel.phone} | Adress: {theHotel.address}</strong></small>
                </div>
                <div style={{textAlign: 'center', width: '50%', overflow: 'hidden', backgroundColor: 'white',borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)'}}>
                    <h2>About</h2>
                    <h3 style={{fontWeight:'normal'}}>{theHotel.description}</h3>
                    <p><strong>Ranking: {theHotel.ranking}</strong></p>
                    <p>Visit Website <a href={theHotel.website}>{theHotel.name}</a></p>
                </div>
            </div>
            <div style={{marginTop: '24px', display:'inline-block'}}>
                <CardDeck>{theHotel.hac_offers.offers.map(offer=>(
                    <div style={{display:'inline-block', textAlign: 'center', 'marginTop': '50px', width: 'fit-content', marginLeft:'auto',marginRight:'auto', padding: '8px'}} fluid>
                        <Card border="info" style={{ width: '18rem', borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)' }}>
                            <Card.Header style={{color: 'green'}}><strong>{offer.display_price === undefined ? 'Contact for price': offer.display_price}</strong></Card.Header>
                            <Card.Img variant="top" src={offer.logo}/>
                            <Card.Body>
                            {offer.free_cancellation_message ? <p>{offer.free_cancellation_message}</p> : null}
                            <p style={{color: offer.availability === 'available' ? 'green' : 'red'}}><strong>{offer.availability}</strong></p>
                            </Card.Body>
                            {user.id === null || user.id === undefined ?
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled
                                startIcon={<SaveIcon />}
                            >
                                Log In To Add To Board
                            </Button>
                            :
                            current_board === null || current_board === undefined ?
                                <PopupExampleNested theHotel={theHotel} history={history} user_id={user.id} lastTripBoard={lastTripBoard} dispatch={dispatch}/>
                                :
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={offer.availability === 'available' ? false : true} 
                                    startIcon={<SaveIcon />}
                                    onClick={()=> {
                                        addToBoard(theHotel, current_board, user.id)
                                    }}
                                >
                                    Add To Board
                                </Button>
                            }
                        </Card>
                    </div>
                ))}
                </CardDeck>
            </div>
            <div style={{textAlign: 'center', paddingTop: '24px'}}>
                <div style={{textAlign: 'center' ,marginBottom: '50px', width: '30%', float: 'left', paddingRight: '24px', marginLeft: '300px'}}>
                    <List className={classes.root} subheader={<li />}>
                        <ListSubheader style={{bordeColor: 'rgb(230, 228, 225)', borderBottomStyle: 'solid'}}>All amenities</ListSubheader>
                        {theHotel.amenities.map((a, index) => (
                        <ListItem key={`item-$-${index}`}>
                            <ListItemText primary={a.name} />
                        </ListItem>
                        ))}
                    </List>
                </div>
                {/* <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 2), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', width: '30%', overflow: 'hidden', padding: '24px', marginLeft: '24px'}}> */}
                <List className={classes.root2} subheader={<li />}>
                <ListSubheader style={{bordeColor: 'rgb(230, 228, 225)', borderBottomStyle: 'solid'}}>Reviews/Tips</ListSubheader>
                    {full ? full.map(rev =>(
                        <HotelComment review={rev}/>
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
                            <Btn3 htmlType="submit" type="primary" onClick={() => newReview(user, theHotel, theComment)}>
                            Add Review
                            </Btn3>
                        </Form.Item>
                        </Form>
                        }
                        />
                </List>
                {/* </div> */}
            </div>
            <div style={{display:'inline-block', textAlign: 'center', 'marginTop': '50px', width: 'fit-content', marginLeft:'auto',marginRight:'auto', padding: '8px'}} fluid>

                <CardDeck>{theHotel.awards.map(award=>(
                <div style={{display:'inline-block', textAlign: 'center', 'marginTop': '50px', width: 'fit-content', marginLeft:'auto',marginRight:'auto'}} fluid>

                <Card border="warning" style={{ width: '18rem', borderRadius: '8px' }}>
                <Card.Header>{award.award_type}</Card.Header>
                    <Card.Body>
                    <Card.Title>{award.year}</Card.Title>
                    </Card.Body>
                </Card>
                </div>
                ))}
                </CardDeck>
            </div>
        </div>
    );
}
 
export default HotelShow;