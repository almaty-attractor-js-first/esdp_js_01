import React, { Fragment } from 'react';
import Header from '../../components/UI/AppBar/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";


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
  footer: {
    padding: theme.spacing(1),
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Header user={props.user} logout={props.logout}/>
      <main className={classes.main}>
        {props.children}
        <footer className={classes.footer}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
        </footer>
      </main>
    </Fragment>
  );
};


export default Layout;
