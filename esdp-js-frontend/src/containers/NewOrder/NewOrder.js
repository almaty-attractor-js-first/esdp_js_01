import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserForm from '../../components/NewOrderItem/UserForm';
import OrderForm from '../../components/NewOrderItem/OrderForm';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Reviews from "../../components/NewOrderItem/Reviews";
import RadioButtonsGroup from "../../components/NewOrderItem/RadioButtons";
import {addOrder, updateOrderItems, updateUserData} from "../../store/actions/newOrderActions";
import config from "../../config";
import {withRouter} from "react-router";

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3, 0),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      justifyContent: 'flex-end',
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  total: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  buttonsWrapper: {
    justifyContent: 'space-between'
  },
  radioButtons: {
    justifyContent: 'space-between'
  },
}));

const steps = ['Детали заказа', 'ФИО и доставка', 'Summary'];

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const [deliveryType, setDeliveryType] = React.useState('delivery');
  const lastStep = activeStep === steps.length - 1;
  const isCash = paymentMethod === 'cash';
  const [websocket, setWs] = React.useState(new WebSocket(`${config.wsURL}/new`));

  React.useEffect(() => {
    // setWs(new WebSocket(`${config.wsURL}/new`));
    console.log(websocket);
    return (() => {
      websocket && websocket.close();
    })
  }, []);

  React.useEffect(() => {
    console.log(websocket)
  }, [websocket]);

  websocket.onopen = () => {
    console.log('connected');
  };

  websocket.onclose = () => {
    console.log('disconnected');
  };



  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleChangeDeliveryType = (event) => {
    setDeliveryType(event.target.value);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSendOrder = () => {
    const order = {
      firstName: props.userData.firstName,
      lastName: props.userData.lastName,
      email: props.userData.email,
      phone: props.userData.phone,
      address: props.userData.address,
      completedDate: props.completedDate,
      orderItems : props.orderItems,
      paymentMethod : paymentMethod,
      deliveryType : deliveryType,
      totalPrice: props.totalPrice
    };
    props.addOrder(order)
      .then(() => {
        console.log('readyState', websocket);
        let message = JSON.stringify({
          type: 'NEW_ORDER'
        });
        if (websocket.readyState === 1) {
          websocket.send(message);
        }
      }).then(() => props.history.push("/orders/saved"))
        .catch(error => console.log(error));
  };

  useEffect(() => {
    return () => {
      props.updateOrderItems([{
        cleaningType: "",
        qty: 1,
        price: 0
      },]);
      props.updateUserData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: ''
      });
    };
  }, []);


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <OrderForm />;
      case 1:
        return <UserForm deliveryType={deliveryType}/>;
      case 2:
        return <Reviews deliveryType={deliveryType} paymentMethod={paymentMethod}/>;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Оформление заказа
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {activeStep === 1 && (
                  <Grid container className={classes.radioButtons}>
                      <RadioButtonsGroup value={deliveryType}
                                         handleChange={handleChangeDeliveryType}
                                         legend='Способ доставки'
                                         valueFirst='delivery'
                                         labelFirst='Доставка'
                                         valueSecond='self'
                                         labelSecond='Самовывоз'
                                         labelPlacement='end'
                                         name='deliveryType'
                      />
                      <RadioButtonsGroup value={paymentMethod}
                                         handleChange={handleChangePaymentMethod}
                                         legend='Способ оплаты'
                                         valueFirst='cash'
                                         labelFirst='Наличными'
                                         valueSecond='epay'
                                         labelSecond='Онлайн'
                                         labelPlacement='end'
                                         name='paymentMethod'
                      />
                  </Grid>
                )}
                <Grid container  spacing={2} className={classes.buttonsWrapper}>
                  {activeStep !== 3 && (
                    <Grid item xs={12} sm={7}>
                      <Typography className={classes.total} component="h6" variant="h6">
                        Заказ на сумму: {props.totalPrice} ₸
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={5}>
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button} color="default" >
                          Назад
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={isCash && lastStep ? handleSendOrder : handleNext}
                        className={classes.button}
                      >
                        {lastStep ? 'Оформить' : 'Далее'}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    totalPrice: state.newOrder.totalPrice,
    completedDate: state.newOrder.completedDate,
    userData: state.newOrder.userData,
    orderItems: state.newOrder.orderItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrder: (order) => dispatch(addOrder(order)),
    updateOrderItems: (order) => dispatch(updateOrderItems(order)),
    updateUserData: (userData) => dispatch(updateUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
