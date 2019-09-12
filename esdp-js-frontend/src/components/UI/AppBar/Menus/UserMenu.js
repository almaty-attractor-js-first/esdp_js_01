import React, {Fragment} from 'react';
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  link: {
    color: "#fff",
    '&:hover': {
      textDecoration: 'none',
      color: '#fff'
    },
  },
}));


export default function UserMenu(props) {
  const classes = useStyles();
  
  return (
    <Fragment>
      <Button color="primary"
              variant={"text"}
              component={Link}
              to='/edit-types'
              className={classes.link}>
        чистки
      </Button>
      <Button color="primary"
              variant={"text"}
              component={Link}
              to='/edit-statuses'
              className={classes.link}>
        статусы
      </Button>
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
      <IconButton
        edge="end"
        aria-owns={props.isMenuOpen ? 'material-appbar' : undefined}
        aria-haspopup="true"
        onClick={props.handleProfileMenuOpen}
        color="inherit"
      >
          <AccountCircle />
      </IconButton>
    </Fragment>
  )
}
