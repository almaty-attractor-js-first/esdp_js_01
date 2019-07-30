import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Имя на карте', detail: 'Mr John Smith' },
  { name: 'Номер карты', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Дата', detail: '04/2024' },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Сводка / Резюме?
      </Typography>
      <List disablePadding>
        {props.cleaningTypesFields.map(product => (
          <ListItem className={classes.listItem} key={product.cleaningType}>
            <ListItemText primary={`${product.title} x ${product.qty}`} secondary={product.cleaningType} />
            <Typography variant="body2">{product.price * product.qty} ₸</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Заказ на сумму:" />
          <Typography variant="subtitle1" className={classes.total}>
            {props.totalPrice} ₸
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Доставка
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Детали оплаты
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    cleaningTypesFields: state.newOrder.orderItems,
    cleaningItems: state.newOrder.cleaningItems,
    totalPrice: state.newOrder.totalPrice
  };
};

export default connect(mapStateToProps)(Review);

