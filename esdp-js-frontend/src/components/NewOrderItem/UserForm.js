import React, {Fragment, useEffect, useReducer, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {getUserByPhoneNumber, updateUserData} from "../../store/actions/newOrderActions";
import {connect} from "react-redux";
import TimePicker from "../UI/DatePicker";
import ReactMapGl from "../UI/ReactMap/ReactMapGl";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from "react-input-mask";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  phoneField: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '35%',
    left: '47%'
  },
}));

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const UserForm = props => {
  const classes = useStyles();
  const { userData } = props;
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      firstName: props.userData.firstName,
      lastName: props.userData.lastName,
      phone: props.userData.phone,
      email: props.userData.email,
      address: props.userData.address
    }
  );

  const prevAmount = usePrevious({ userData, userInput });

  const handleChange = e => {
    const {name, value} = e.target;
    setUserInput({[name]: value});
  };

  const autocompleteUserFields = e => {
    const phoneField = e.target.value;
    const inputName = e.target.name;
    if (phoneField.length === 15 && inputName === 'phone') {
      props.getUserByPhoneNumber(phoneField).then(response => {
        if (response) {
          setUserInput(response.data);
        }
      });
    }
  };

  useEffect(() => {
    if (prevAmount) {
      if (prevAmount.userInput !== userInput) {
        props.updateUserData(userInput);
      }
    }
  }, [userInput]);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Введите ФИО, выберите способ доставки и оплаты
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}                      className={classes.phoneField}
        >
          <InputMask value={userInput.phone}
                     helperText="123 456 7890"
                     mask="+7 999 999 9999"
                     maskChar={null}
                     required
                     id="phone"
                     name="phone"
                     label="Телефон"
                     fullWidth
                     onChange={(e) => {autocompleteUserFields(e); handleChange(e); }}>
            {(inputProps) => <TextField {...inputProps}
                                        type="tel" value={userInput.phone} />}
          </InputMask>
          {props.loading && <CircularProgress size={20} className={classes.progress}/>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={props.loading}
            value={userInput.email}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={props.loading}
            value={userInput.firstName}
            required
            id="firsName"
            name="firstName"
            label="Имя"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={props.loading}
            value={userInput.lastName}
            required
            id="lastName"
            name="lastName"
            label="Фамилия"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        {props.deliveryType === 'delivery' ?
        <Fragment>
          <Grid item xs={props.deliveryType === 'delivery' ? 9 : 12}>
            <TextField
              disabled={props.loading}
              value={userInput.address}
              required
              id="address"
              name="address"
              label="Адрес"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid container item justify='flex-end' xs={3}>
            <TimePicker />
          </Grid>
        </Fragment>
        :
          <ReactMapGl />
          // Добавить маркер на карту с адресом и временем работы точки
        }
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.newOrder.userData,
    autocomplete: state.newOrder.autocomplete,
    loading: state.newOrder.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserByPhoneNumber: (phoneNumber) => dispatch(getUserByPhoneNumber(phoneNumber)),
    updateUserData: (userData) => dispatch(updateUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
