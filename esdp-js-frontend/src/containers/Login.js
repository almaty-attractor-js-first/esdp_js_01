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
import {loginUser} from "../store/actions/usersActions";
import {TextField} from "@material-ui/core";
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(12),
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
  text: {
    color: theme.palette.text.primary,
  },
});

class SignIn extends React.Component {
  state = {
    phone: '',
    password: ''
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.loginUser(this.state)
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
              Вход
            </Typography>
            <form className={classes.form}
                  noValidate
                  onSubmit={this.onSubmitHandler}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Телефон"
                name="phone"
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.inputChangeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.inputChangeHandler}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    user: state.users.user,
    error: state.users.loginError
  }
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: (userData) => dispatch(loginUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
