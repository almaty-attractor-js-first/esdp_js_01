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


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
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
    '&:hover': {
      textDecoration: 'none',
      color: '#fff'
    },
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        props.logout()
          .then(() => props.openSnack('Good bye', 'success'));
        handleMenuClose();}}>
        Logout
      </MenuItem>
      <MenuItem onClick={handleMenuClose}
                component={Link}
                to='/track_history'>
        Track history
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.link}
                      variant="h6" noWrap
                      component={Link}
                      to='/'>
            Sneakers cleaning
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
              props.user ?
                <div className={classes.user}>
                  <Typography>{props.user.displayName}</Typography>
                  <UserMenu isMenuOpen={isMenuOpen}
                            handleProfileMenuOpen={handleProfileMenuOpen}
                            user={props.user}
                            avatar={classes.avatar}/>
                </div>
               :
                <AnonimousMenu/>
            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};



export default Header;
