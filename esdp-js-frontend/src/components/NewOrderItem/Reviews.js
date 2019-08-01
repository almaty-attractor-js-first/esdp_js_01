import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  alignRight: {
    textAlign: 'right'
  }
}));

function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Сводка / Резюме?
      </Typography>
      <List disablePadding>
        {props.cleaningTypesFields.map((product, index) => (
          <Fragment  key={index}>
            <ListItem className={classes.listItem}>
              <ListItemText primary={`${product.title} x ${product.qty}`}/>
              <Typography variant="body2">{product.price * product.qty} ₸</Typography>
            </ListItem>
            <Divider light />
          </Fragment>
        ))}
        <ListItem className={classes.listItem} style={{marginTop: '15px'}}>
          <ListItemText primary="Заказ на сумму:" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.totalPrice} ₸
          </Typography>
        </ListItem>
        <Divider />
      </List>
      <Grid container spacing={2} justify='flex-end'>
        <Grid item xs={12} className={classes.alignRight}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {props.deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'}
          </Typography>
          <Typography gutterBottom>{`${props.userData.firstName} ${props.userData.lastName}`}</Typography>
          {
            props.deliveryType === 'delivery' ?
              <Typography gutterBottom>{props.userData.address}</Typography>
            : null
          }
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    cleaningTypesFields: state.newOrder.orderItems,
    cleaningItems: state.newOrder.cleaningItems,
    totalPrice: state.newOrder.totalPrice,
    userData: state.newOrder.userData
  };
};

export default connect(mapStateToProps)(Review);

