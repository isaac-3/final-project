import React from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TripCard from './TripCard'
import WeatherCard from './WeatherCard'
import Carousel from 'react-bootstrap/Carousel'
import { Empty } from 'antd';
import { Menu, Dropdown, message, Button, Modal} from 'antd';
import {UserOutlined,CalendarOutlined  } from '@ant-design/icons';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Avatar, Tooltip } from 'antd';
import { UserAddOutlined, EditOutlined } from '@ant-design/icons'
import { Mentions } from 'antd'
import Geocode from "react-geocode";
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

const { Option } = Mentions;

const TripShow = () => {

    const menu = (
        <Menu>
          <Menu.Item key="1" icon={<EditOutlined />} onClick={()=> showModalName()}>
            Change Name
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />} onClick={() => showModal()}>
            Change Date
          </Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />} onClick={() => showModalUsers()}>
            Add User
          </Menu.Item>
        </Menu>
      );

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

    let onSearch = (e) => {
        e.preventDefault();
        Geocode.fromAddress(address.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            getNewForecast(lat,lng)
        },
        error => {
            console.error(error);
        }
        );
      }

      let [address, setAddress] = useState({
        address: ''
      })
    let currentUser = useSelector( state => state.user)
    let params = useParams()
    let id = params.id
    let [trip, setTrip] = useState()
    let [forecast, setForecast] = useState()
    let [selectedDate, setSelectedDate] = useState(trip === undefined ? null : null)
    const [visable, setVisable] = useState(false)
    const [visableName, setVisableName] = useState(false)
    const [visableUser, setVisableUser] = useState(false)

    let [tripUsers, setTripUsers] = useState({})
    let [allUsers, setAllUsers] = useState()
    let [addedUser, setAddedUser ] = useState()
    let [trip_name, setTripName] = useState(trip === undefined ? null : null)
    let [newName, setNewName] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/trips/${id}`)
        .then(res=>res.json())
        .then(trip => {
            setTrip(trip)
            setSelectedDate(trip.trip_date)
            setTripUsers({tripUsers:trip.users})
            setTripName(trip.name)
        })
    },[])

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(res=>res.json())
        .then(all_users => {
            setAllUsers(all_users)
        })
    },[])

    let getNewForecast = (lat, lng) => {
        fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=en&lat=${lat}&lon=${lng}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res=>res.json())
        .then(weather=>(
            setForecast(weather.data)
        ))
    }

    useEffect(()=>{
        fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=en&lat=29.7604&lon=-95.3698", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key": "131ae5c4cemsh8e8956949fd0505p1730d0jsn708cf0291522"
            }
        })
        .then(res=>res.json())
        .then(weather=>(
            setForecast(weather.data)
        ))
    },[])

    if(trip === undefined || forecast === undefined){
        return null //<p>loading</p>
    }


    if(trip === undefined || tripUsers.tripUsers === undefined || allUsers === undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }

    // let o = allUsers.map((n, index) => (
    //     index
    // ))


    // let oop = allUsers.filter(user=>(
    //     user.id !== tripUsers.tripUsers[0].id && user.id !== tripUsers.tripUsers[1].id
    // ))
    // console.log(oop)

    // let pls = allUsers.filter( el => {
    //     return tripUsers.tripUsers.filter( f => {
    //       return f.id === el.id
    //     });
    //   });


    let showModal = () => {
        setVisable(true);
      };

    let showModalName = () => {
    setVisableName(true);
    };

    let showModalUsers = () => {
        setVisableUser(true);
    };

    let handleCancel = () => {
        setVisable(false);
      };

    let handleCancelName = () => {
    setVisableName(false);
    };

    let handleCancelUsers = () => {
        setVisableUser(false);
        };

    const handleDateChange = (date) => {
        newDate(trip, date)
        setVisable(false)
        handleCancel()
    };

    let newDate = (trip, date) => {
        fetch(`http://localhost:3000/change_date/${trip.id}`,{
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: trip,
                trip_date: date
            })
        })
        .then(res=>res.json())
        .then(result => (
            setSelectedDate(result.trip_date)
        ))
    }

    function onSelect(option) {
        setAddedUser(option.value)
      }

      let addUserToTrip = (trip, addedUser) => {
        fetch('http://localhost:3000/user_trips',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: addedUser,
                trip: trip
            })
        })
        .then(res=>res.json())
        .then(user => (
            setTripUsers({
                tripUsers: [...tripUsers.tripUsers, user]
            })
        ))
      }

      let onNewName = (word) => {
          setNewName(word)
      }

      let changeName = (trip, newname) => {
        fetch(`http://localhost:3000/change_name/${trip.id}`,{
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                trip_id: trip,
                newname: newname
            })
        })
        .then(res=>res.json())
        .then(result => (
            setTripName(result.name)
        ))
        handleCancelName()
    }
    let first = forecast.slice(0, 7)
    let second = forecast.slice(7,-2)


    return (
        <div style={{backgroundColor: 'rgb(223, 229, 235)', backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 20%,rgba(255,255,255,1)),url('/edittrip.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>

        <div style={{textAlign: 'center', paddingTop: '50px', width: 'fit-content', 'marginLeft':'auto','marginRight':'auto'}} fluid>
            <form noValidate autoComplete="off" style={{paddingTop: '50px'}} onSubmit={onSearch}>
                <TextField id="outlined-basic" label="Search by address" variant="outlined" style={{backgroundColor: 'rgb(223, 229, 235)'}}
                value={address.address}
                onChange={(e) => setAddress({ ...address,address: e.target.value })}
                />
                <button input="submit" style={{border: 'none',backgroundColor: 'transparent', height: '53px', textDecoration: 'none'}}><SearchIcon/></button>
            </form>
            <div style={{display:'inline-block', textAlign: 'center', 'marginTop': '50px', width: '100%', marginLeft:'auto',marginRight:'auto', padding: '8px'}} fluid>
                <h3>14-Day Forecast</h3>
                <Carousel style={{height: '300px', marginLeft: '50px'}}>
                <Carousel.Item style={{marginBottom: '24px', height: '400px'}}>
                    <img
                    className="d-block w-100 h-100"
                    style={{opacity: '0'}}
                    src="https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <WeatherCard first={first}/>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{marginBottom: '24px', height: '400px'}}>
                    <img
                    className="d-block w-100 h-100"
                    style={{opacity: '0'}}
                    src="https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <WeatherCard first={second}/>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
            <div style={{paddingBottom: '24px', textAlign:"center"}}>
                <h1>{trip_name ? trip_name : 'Your Trip Awaits'}</h1>
                <h3>Start Plan Date: {trip.trip_date.substring(0,10)} <span style={{color: 'green'}}>Trip Date: </span> {trip.trip_date === undefined ?  'No Date Set': selectedDate ? selectedDate.substring(0,10) : null}
                    <Dropdown overlay={menu}>
                    <Button style={{marginLeft: '24px'}} shape="round" size="small">
                        Edit
                    </Button>
                    </Dropdown>
                </h3>
                {trip.bookings.length === 0 && trip.reservations.length === 0 && trip.full_tickets.length === 0 && trip.events.length === 0 ? 
                <div style={{paddingBottom: '16px'}}>
                    {tripUsers.tripUsers.map(user => (
                        <Tooltip title={user.username} color={user.id === currentUser.id ? 'red' : 'blue'}>
                            <Avatar src={user.pic_url ? user.pic_url : "https://i0.wp.com/cms.ironk12.org/wp-content/uploads/2020/02/no-person-profile-pic.png?ssl=1"} gap={4}/>
                        </Tooltip>
                    ))} 
                    <div style={{marginLeft: '620px'}}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{width: '200px'}}/>
                    </div>
                </div>
                 :
                <div>
                    <div style={{paddingBottom: '16px'}}>
                        {tripUsers.tripUsers.map(user => (
                            <Tooltip title={user.username} color={user.id === currentUser.id ? 'red' : 'blue'}>
                                <Avatar src={user.pic_url ? user.pic_url : "https://i0.wp.com/cms.ironk12.org/wp-content/uploads/2020/02/no-person-profile-pic.png?ssl=1"} gap={4}/>
                            </Tooltip>
                        ))} 
                    </div>
                {trip.bookings.map(book => (
                    <TripCard key={book.id} book={book}/>
                ))}
                {trip.reservations.map(book => (
                    <TripCard key={book.id} book={book}/>
                ))}
                {trip.full_tickets.map(book => (
                        <TripCard key={book.id} book={book}/>
                ))}
                {trip.events.map(book => (
                    <TripCard key={book.id} book={book}/>
                ))}
                </div>
                }
            </div>
            <Modal
                visible={visable}
                style={{textAlign: 'center'}}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Cancel
                    </Button>
                ]}
                >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disablePast
                        margin="normal"
                        id="date-picker-dialog"
                        label="Change Trip Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>,
            </Modal>
            <Modal
                visible={visableName}
                style={{textAlign: 'center'}}
                onCancel={handleCancelName}
                footer={[
                    <Button key="back" onClick={handleCancelName}>
                    Cancel
                    </Button>
                ]}
                >
                    <TextField id="outlined-basic" label="New Trip Name" variant="outlined" onChange={(e)=>onNewName(e.target.value)}/><br/><br/>
                    <Button shape="round" onClick={() => changeName(trip, newName)}>Change Name</Button>
            </Modal>
            <Modal
                width='300px'
                visible={visableUser}
                style={{textAlign: 'center'}}
                onCancel={handleCancelUsers}
                footer={[
                    <Button key="back" onClick={handleCancelUsers}>
                    Cancel
                    </Button>
                ]}
                >
                    <Mentions
                    style={{ width: '75%', marginTop: '26px' }}
                    onSelect={onSelect}
                    >
                        {allUsers.map(user => (
                            <Option value={user.username}>{user.username}</Option>
                        ))}
                    </Mentions>
                    <Button shape="round" onClick={()=>{
                        addUserToTrip(trip, addedUser)
                        handleCancelUsers()
                    }}>Add User</Button>
            </Modal>
        </div>
        </div>
    );
}
 
export default TripShow;