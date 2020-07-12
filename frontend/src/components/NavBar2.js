import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {LogForm} from './LogPop'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {

let user = useSelector( state => state.user)
const dispatch = useDispatch()
let history = useHistory()

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const isOptionsOpen = Boolean(menuAnchor);


  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionMenuClose = () => {
    setMenuAnchor(null);

  }


  const handleOptionsMenuOpen = (event) => {
      setMenuAnchor(event.currentTarget);

  }
  const menuId = 'primary-search-account-menu';

  const menuOptions = "menu-optins"

  const optionsMenu = (
    <Menu
    anchorEl={menuAnchor}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    id={menuOptions}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    open={isOptionsOpen}
    onClose={handleOptionMenuClose}
    >
      <MenuItem onClick={()=>{
        history.push('/activities')
        handleOptionMenuClose()
      }}>View All Activities</MenuItem>
      <MenuItem onClick={()=>{
        history.push('/airports')
        handleOptionMenuClose()
      }}>View All Airports</MenuItem>
      <MenuItem onClick={()=>{
        history.push('/hotels')
        handleOptionMenuClose()
      }}>View All Hotels</MenuItem>
      <MenuItem onClick={()=>{
        history.push('/restaurants')
        handleOptionMenuClose()
      }}>View All Restaurants</MenuItem>
      <MenuItem onClick={()=>{
        history.push('/experiences')
        handleOptionMenuClose()
      }}>View User Experiences</MenuItem>
    </Menu>
    );

  const renderMenu = (
    user.id === undefined ? 
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
      <MenuItem onClick={handleMenuClose}><LogForm/></MenuItem>
      </Menu>
      :
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{
        history.push('/my-profile')
        handleMenuClose()
      }}>Profile</MenuItem>
      <MenuItem onClick={() => {
        history.push(`/my-trips/${user.id}`)
        handleMenuClose()
      }}>My Trips</MenuItem>
      <MenuItem onClick={()=> {
        dispatch({ type: "LOG_OUT" })
        dispatch({ type: "LOG_OUT_BOARD" })
        history.push('/')
      }}>Log Out</MenuItem>
    </Menu>
      
  );
  // if(user.id !== undefined){
  //   dispatch({type: "AFTER_LOG_IN_PROPS", user: user})
  // }
  let margin = user.id !== undefined ? '370px' : '510px'
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor: 'rgb(14, 39, 128)', color: 'white'}}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="account of current user"
            aria-controls={menuOptions}
            aria-haspopup="true"
            onClick={handleOptionsMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={()=> history.push('/')}
          >
            <HomeRoundedIcon /><small><strong>Home</strong></small>
          </IconButton>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          {/* {console.log(user ? marginRight: '370px' : marginRight: '370px')} */}
          <h1 style={{marginRight: margin, color: 'rgb(223, 229, 235)', fontFamily: 'cursive'}}>Your Trip Awaits</h1>
          <div className={classes.sectionDesktop}>
              {user.id ?
                <MenuItem>
                    {user.pic_url == null || undefined ? <Avatar icon={<UserOutlined />} /> : <Avatar src={user.pic_url} />}
                    <MenuItem>{user.username}</MenuItem>
                </MenuItem>
                : null
              }
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {optionsMenu}
      {renderMenu}
    </div>
  );
}
