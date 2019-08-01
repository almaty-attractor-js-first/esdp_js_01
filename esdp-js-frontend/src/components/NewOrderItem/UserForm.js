import React, {Fragment, useEffect, useReducer} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {updateUserData} from "../../store/actions/newOrderActions";
import {connect} from "react-redux";
import TimePicker from "../UI/DatePicker";

function UserForm(props) {
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
  const handleChange = e => {
    const {name, value} = e.target;
    setUserInput({[name]: value});
  };

  useEffect(() => {
    props.updateUserData(userInput);
  }, [userInput]);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Введите ФИО, выберите способ доставки и оплаты
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={userInput.email}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={userInput.phone}
            required
            id="phone"
            name="phone"
            label="Телефон"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
            value={userInput.lastName}
            required
            id="lastName"
            name="lastName"
            label="Фамилия"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={props.deliveryType === 'delivery' ? 9 : 12}>
          {props.deliveryType === 'delivery' ?
            <TextField
              value={userInput.address}
              required
              id="address"
              name="address"
              label="Адрес"
              fullWidth
              onChange={handleChange}
            />
          : <Typography align='center'>КАРТА</Typography>}

        </Grid>
        <Grid container item justify='flex-end' xs={props.deliveryType === 'delivery' ? 3 : 12}>
          <TimePicker />
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.newOrder.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: (userData) => dispatch(updateUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
