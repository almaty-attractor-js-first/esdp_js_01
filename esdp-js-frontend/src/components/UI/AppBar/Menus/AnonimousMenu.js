import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  link: {
    color: "#fff",
    '&:hover': {
      textDecoration: 'none',
      color: '#fff'
    },
  },

}));

export default function AnonimousMenu() {
  const classes = useStyles();
  return (
    <Fragment>
      <Button color="primary"
              variant={"text"}
              component={Link}
              to='/order-items'
              className={classes.link}>
        заказы
      </Button>
      <Button color="secondary"
              variant={"text"}
              component={Link}
              to='/register'
              className={classes.link}>
        регистрация
      </Button>
    </Fragment>
    )
}
