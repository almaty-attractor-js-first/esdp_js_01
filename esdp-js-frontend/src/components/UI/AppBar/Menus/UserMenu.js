import React, {Fragment} from 'react';
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import indigo from '@material-ui/core/colors/indigo';
import {darken} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
      background: darken(indigo[500], 0.07),
    },
  },
  avatar: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  top: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
}));


export default function UserMenu(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.top}>
      <div>
        <Button color="primary"
                variant={"text"}
                component={Link}
                to='/admin-order-items'
                className={classes.link}>
          админ
        </Button>
        <Button color="primary"
                variant={"text"}
                component={Link}
                to='/order-items'
                className={classes.link}>
          мастер
        </Button>
        {props.user.role === 'admin' ?
          <Fragment>
            <Button color="primary"
                    variant={"text"}
                    component={Link}
                    to='/edit-types'
                    className={classes.link}>
              чистки
            </Button>
            < Button color = "primary"
                     variant={"text"}
                     component={Link}
                     to='/edit-statuses'
                     className={classes.link}>
              статусы
            </Button>
            <Button color="secondary"
                    variant={"text"}
                    component={Link}
                    to='/register'
                    className={classes.link}>
              регистрация
            </Button>
          </Fragment>
          : null
        }
      </div>
      <div className={classes.avatar}>
        <Typography variant="body2" style={{marginLeft: '35px', marginRight: '5px'}}>
          {`${props.user.firstName} ${props.user.lastName}`}
        </Typography>
        <IconButton edge="end"
                    aria-owns={props.isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={props.handleProfileMenuOpen}
                    color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  )
}
