import React from 'react';
import Geocode from "react-geocode";
import {useParams, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux'
import {message} from 'antd';
import { Button as Btn2, Grid, Popup } from 'semantic-ui-react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {LogForm} from './LogPop'

const PopupExampleNested = (props) => (
    <Popup wide trigger={
    <Button 
        variant="contained"
        color="secondary"
        size="small"
        >You have no current board!</Button>} 
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
  

const AirShow = () => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
    let params = useParams()
    let code = params.id
    let [air, setAirport] = useState({})

    let [allAirports, setAirports] = useState([])

    let [ticket, setTicket] = useState({
        departure: {},
        dep_date: new Date(),
        destination: {},
        dest_date: new Date()
    })
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [selectedDateTwo, setSelectedDateTwo] = useState(selectedDate)


    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedDateTwo(date)
        setTicket({
            ...ticket,
            dep_date: date 
        })
    };

    const handleDateChangeTwo = (date) => {
        setSelectedDateTwo(date);
        setTicket({
            ...ticket,
            dest_date: date 
        })
    };

    let [check, setCheck] = useState({hidden: false})
    
    let onCheck = () => {
        setCheck({hidden: check.hidden ? false : true})
    }

    let [address, setAddress] = useState({
        address: ''
    })

    let onSearch = (e) => {
        e.preventDefault();
        Geocode.fromAddress(address.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            getNewAirports(lat, lng)
        },
        error => {
            console.error(error);
        }
        );
    }

    let getNewAirports = (lat, lng) => {
        fetch(`https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=50&lng=${lng}&lat=${lat}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res => res.json())
        .then(result => (
            setAirports({allAirports: result})
        ))
    }

    let current_board = useSelector( state => state.trip_board)
    let user = useSelector( state => state.user)
    let dispatch = useDispatch()
    let history = useHistory()

    let getUserProps = () => {
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(res=>res.json())
        .then(user=>(
            dispatch({ type: "USER_PROPS", user: user})
        ))
    }

    useEffect(()=>{
        fetch(`https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-code?code=${code}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res=>res.json())
        .then(result=>(
            setAirport({air: result})
        ))
        if(user){
            getUserProps()
        }
    },[])
    if(air.air === undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    let airport = air.air[0]
    let lastTripBoard = user.trips !== undefined ? user.trips[user.trips.length - 1] : null
    let addToBoard = (ticket, current_board, user_id) => {
        fetch("http://localhost:3000/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user_id,
              trip_id: current_board,
              ticket: ticket
            })
        })
        message.success("Successfully added")
    }
    return (
        <div style={{textAlign: 'center', paddingTop: '100px', backgroundColor: 'rgb(223, 229, 235)'}}>
            <div style={{paddingTop: '20px', backgroundColor: 'rgb(223, 229, 235)'}}>
                <div style={{borderColor: 'red', display:'inline-block', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 4), 0 6px 30px 0 rgba(0, 0, 0, 0.19)', paddingLeft: '24px', paddingRight: '24px', borderRadius: '16px', backgroundColor: 'white'}}>
                    <h1>{airport.name}</h1>
                    <h1>{airport.city}</h1>
                    <h1>{airport.code}</h1>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disablePast
                        margin="normal"
                        id="date-picker-dialog"
                        label="Set Departure Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                        <div style={{paddingBottom: '8px'}}>
                            {user.id === null || user.id === undefined ? null :
                            <Button
                            style={{backgroundColor: 'rgb(48, 120, 242)', color: 'white'}}
                            variant="contained"
                            size="small"
                            onClick={()=> {
                                setTicket({
                                    ...ticket,
                                    departure: airport 
                                })
                                onCheck()
                            }}
                            >
                                Set as Departure
                            </Button>}
                        </div>
                    {ticket.departure.city === undefined ? null : <CheckCircleOutlineIcon style={{fill: "green"}}/>}
                </div><br/>
            </div>
            <br/>
            {user.id === null || user.id === undefined ?
            <div style={{height: '600px',backgroundColor: 'rgb(223, 229, 235)'}}>
                            <Button
                style={{backgroundColor: 'rgb(48, 120, 242)', color: 'white'}}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
                disabled
            >
                Log In To Select Airport
            </Button>
            </div>
            :
            current_board === null || current_board === undefined ?
                <PopupExampleNested airport={airport} history={history} user_id={user.id} lastTripBoard={lastTripBoard} dispatch={dispatch}/>
                : ticket.departure.city === undefined ? 
                <div style={{height: '600px',backgroundColor: 'rgb(223, 229, 235)'}}>
                </div>
                :
                <div>
                <h1>To: </h1>
                    <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}>
                        <TextField id="outlined-basic" label="Search Return City" variant="outlined"
                        value={address.address}
                        onChange={(e) => setAddress({ ...address,address: e.target.value })}
                        />
                        <button input="submit" style={{border: 'none',backgroundColor: 'inherit', height: '53px', textDecoration: 'none'}}><SearchIcon/></button>
                    </form>
                    {allAirports.allAirports !== undefined ?
                    <table style={{backgroundColor: 'rgb(223, 229, 235)',borderCollapse: 'collapse', width: '80%', height: '200px', margin: 'auto', marginTop: '100px'}}>
                        <tr  style={{padding: '8px',textAlign: 'center', borderBottom: '1px solid #ddd'}}>
                            <th>Name</th>
                            <th>Code</th>
                            <th>City</th>
                            <th>Booking</th>
                        </tr>
                        {allAirports.allAirports.map(airport => {
                            return <tr  style={{padding: '8px',textAlign: 'center', borderBottom: '1px solid blue'}}>
                                <td style={{padding: '16px',textAlign: 'left', borderBottom: '1px solid rgb(140, 198, 255)'}}>{airport.name}
                                {ticket.destination.code !== airport.code ? null : <CheckCircleOutlineIcon style={{fill: "green", marginRight: '16px'}}/>}
                                {ticket.destination.code !== airport.code ? null :
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                    disablePast
                                    minDate={selectedDateTwo}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Set Return Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDateTwo}
                                    onChange={handleDateChangeTwo}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                </MuiPickersUtilsProvider>}
                                </td>

                                <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>{airport.code}</td>
                                <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>{airport.city}</td>
                                <td style={{padding: '16px',textAlign: 'center', borderBottom: '1px solid rgb(140, 198, 255)'}}>
                                    {ticket.destination.code === airport.code ? 
                                    <Button 
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={()=> {
                                        addToBoard(ticket, current_board, user.id)
                                    }}
                                >
                                    Book It!
                                </Button>
                                    :
                                <Button
                                    style={{backgroundColor: 'rgb(48, 120, 242)', color: 'white'}}
                                    variant="contained"
                                    size="small"
                                    onClick={()=> {
                                        setTicket({
                                            ...ticket,
                                            destination: airport 
                                        })
                                    }}
                                >
                                    Set As Return
                                </Button>}</td>
                            </tr>
                        })}
                    </table>
                    : 
                    <div style={{height: '600px',backgroundColor: 'rgb(223, 229, 235)'}}>
                      </div>}
                </div>
            }
        </div>
    )
}
 
export default AirShow;