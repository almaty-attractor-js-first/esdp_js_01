import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from "react-router-dom";
import AnonimousMenu from "./Menus/AnonimousMenu";
import UserMenu from "./Menus/UserMenu";
import IconButton from "@material-ui/core/IconButton";
import Statuses from '@material-ui/icons/ListAltRounded';
import Orders from '@material-ui/icons/ReorderRounded';
import NotificationsIcon from '@material-ui/icons/Brush';
import MoreIcon from '@material-ui/icons/MoreVert';
import Register from '@material-ui/icons/LockOpen';
import Logout from '@material-ui/icons/ExitToApp';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  user: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    margin: 10,
  },
  link: {
    color: "#fff",
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff'
    },
    fontSize: '18px',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px',
      display: 'block',
    },
  },
  header: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700]
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        props.logout();
        handleMenuClose();}}>
        Выход
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-account-menu-mobile';
  const renderMobileMenu = (
      <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
      >
        <MenuItem component={Link}
                  to='/orders'
                  onClick={handleMenuClose}>
          <IconButton aria-label="show 4 new mails" color="inherit">
              <Orders />
          </IconButton>
          <p>Заказы</p>
        </MenuItem>
        <MenuItem component={Link}
                  to='/types/edit'
                  onClick={handleMenuClose}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
              <NotificationsIcon />
          </IconButton>
          <p>Чистки</p>
        </MenuItem>
        <MenuItem component={Link}
                  to='/statuses/edit'
                  onClick={handleMenuClose}>
          <IconButton
              aria-label="account of current user"
              aria-controls="primary-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
            <Statuses />
          </IconButton>
          <p>Статусы</p>
        </MenuItem>
        <MenuItem component={Link}
                  to='/register'
                  onClick={handleMenuClose}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Register />
          </IconButton>
          <p>Регистрация</p>
        </MenuItem>
        <MenuItem onClick={() => {
          props.logout();
          handleMenuClose();}}
        >
          <IconButton
              aria-label="account of current user"
              aria-controls="primary-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
            <Logout />
          </IconButton>
          <p>Выход</p>
        </MenuItem>
      </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{marginTop: '4px', paddingBottom: '4px'}} className={classes.header}>
        <Toolbar variant="dense">
          <Typography className={classes.link}
                      variant="h6" noWrap
                      component={Link}
                      to='/'>
            SHOESER
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
              props.user ?
                <div className={classes.user}>
                  <UserMenu isMenuOpen={isMenuOpen}
                            user={props.user}
                            avatar={classes.avatar}
                            handleProfileMenuOpen={handleProfileMenuOpen}/>
                </div>
               :
                <AnonimousMenu user={props.user}/>
            }
          </div>
          <div className={classes.sectionMobile}>
            {
              props.user ?
                  <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                    :
                  <AnonimousMenu user={props.user}/>
            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
};



export default Header;
