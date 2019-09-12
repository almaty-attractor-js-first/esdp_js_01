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

export default function AnonimousMenu({user}) {
  const classes = useStyles();
  return (
    <Fragment>
      <Button color="secondary"
              variant={"text"}
              component={Link}
              to='/login'
              className={classes.link}>
        вход
      </Button>
    </Fragment>
    )
}
