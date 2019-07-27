import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserForm from '../../components/NewOrderItem/UserForm';
import PaymentForm from '../../components/NewOrderItem/PaymentForm';
import OrderForm from '../../components/NewOrderItem/OrderForm';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import SplitButton from "../../components/UI/SplitButton";

const options = ['наличными', 'онлайн', 'Другой вариант'];

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
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  total: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const steps = ['Детали заказа', 'ФИО и доставка', 'Оплата онлайн'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <OrderForm />;
    case 1:
      return <UserForm />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
                <Grid container  spacing={3}>
                  <Grid item xs={12} sm={8}>
                    <Typography className={classes.total} component="h6" variant="h6">
                      Заказ на сумму: {props.totalPrice} тг
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Назад
                        </Button>
                      )}
                      {
                        activeStep === steps.length - 2 ?
                          <SplitButton
                            options={options}
                          /> :
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            Далее
                          </Button>
                      }
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
    totalPrice: state.newOrder.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout)
