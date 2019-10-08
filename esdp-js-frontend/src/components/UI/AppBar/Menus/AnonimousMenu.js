import React, {Fragment} from 'react';
import {darken, makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  link: {
    color: theme.palette.getContrastText(red[700]),
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.getContrastText(red[700]),
      background: darken(red[700], 0.07),
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
