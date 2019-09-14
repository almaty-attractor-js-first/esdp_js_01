import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../store/actions/usersActions";
import {TextField} from "@material-ui/core";
import InputMask from "react-input-mask";
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
  },
  text: {
    color: theme.palette.text.primary,
  },
});

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    email: ''
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  onSubmitHandler = e => {
    e.preventDefault();
    this.props.registerUser(this.state);
  };
  render() {
    const {classes} = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.text}>
            Зарегистрировать пользователя
          </Typography>
          <form className={classes.form}
                noValidate
                onSubmit={this.onSubmitHandler}>
            <InputMask value={this.state.phone}
                       mask="+7 999 999 9999"
                       maskChar={null}
                       required
                       id="phone"
                       name="phone"
                       label="Телефон"
                       fullWidth
                       autoFocus
                       onChange={this.inputChangeHandler}>
              {(inputProps) => <TextField {...inputProps}
                                          type="tel" value={this.state.phone}/>}
            </InputMask>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Имэйл"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.inputChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Имя"
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.inputChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Фамилия"
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.inputChangeHandler}
            />
            <Button
              type="submit"
              variant='contained'
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Продолжить
            </Button>
          </form>
        </div>
      </Container>
    );
  };
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    error: state.users.registerError
  }
};
const mapDispatchToProps = dispatch => {
  return {
    registerUser: (userData) => dispatch(registerUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
