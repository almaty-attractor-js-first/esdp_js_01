import React, { Fragment } from 'react';
import Header from '../../components/UI/AppBar/AppBar'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '70px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '95px',
      maxWidth: '1100px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '0 24px'
    },
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Header user={props.user} logout={props.logout}/>
      <main className={classes.main}>
        {props.children}
      </main>
    </Fragment>
  );
};


export default Layout;
