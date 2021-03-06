import React, {Fragment} from 'react';
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {darken} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.getContrastText(red[700]),
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.getContrastText(red[700]),
      background: darken(red[700], 0.07),
    },
  },
  avatar: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    cursor: 'pointer'
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
                to='/orders'
                className={classes.link}>
          заказы
        </Button>
        {props.user.role === 'admin' ?
          <Fragment>
            <Button color="primary"
                    variant={"text"}
                    component={Link}
                    to='/workers'
                    className={classes.link}>
              сотрудники
            </Button>
            <Button color="primary"
                    variant={"text"}
                    component={Link}
                    to='/clients'
                    className={classes.link}>
              клиенты
            </Button>
            <Button color="primary"
                    variant={"text"}
                    component={Link}
                    to='/types/edit'
                    className={classes.link}>
              чистки
            </Button>
            < Button color = "primary"
                     variant={"text"}
                     component={Link}
                     to='/statuses/edit'
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
      <div className={classes.avatar}
           onClick={props.handleProfileMenuOpen}>
        <Typography variant="body2" style={{marginLeft: '35px', marginRight: '5px'}}>
          {`${props.user.firstName} ${props.user.lastName}`}
        </Typography>
        <IconButton edge="end"
                    aria-owns={props.isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  )
}
