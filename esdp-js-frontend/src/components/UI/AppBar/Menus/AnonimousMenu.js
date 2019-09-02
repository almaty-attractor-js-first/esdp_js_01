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
      <Button color="secondary"
              variant={"text"}
              component={Link}
              to='/register'
              className={classes.link}>
        курьер
      </Button>
    </Fragment>
    )
}
