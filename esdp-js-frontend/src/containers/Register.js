import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormElement from "../components/FormElementMaterial/FormElementMaterial";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../store/actions/usersActions";
import FacebookLogin from "../components/FacebookLogin";
import Chip from "@material-ui/core/Chip";
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
});

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    displayName: '',
    avatarImage: ''
  };
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fileChangeHandler = e => {
    this.setState({avatarImage: e.target.files[0]});
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in this.state) {
      formData.append(key, this.state[key]);
    }

    this.props.registerUser(formData)
      .then(() => {
        if (!this.props.error) {
          return this.props.openSnack(`Success`, 'success');
        }
        this.props.openSnack(this.props.error.errors.username.message, 'error');
      });
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}
                noValidate
                onSubmit={this.onSubmitHandler}>
            <FormElement
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.inputChangeHandler}
            />
            <FormElement
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.inputChangeHandler}
            />
            <FormElement
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Display name"
              name="displayName"
              type="text"
              value={this.state.displayName}
              onChange={this.inputChangeHandler}
            />
            <div className={classes.typeFile}>
              <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={this.fileChangeHandler}
                  name='avatarImage'
              />
              <label htmlFor="contained-button-file">
                <Button component="span"  variant="contained" color="default" className={classes.button}>
                  Select avatar
                </Button>
              </label>
              {this.state.avatarImage ? <Chip onDelete={this.imageDeleteHandler} label={this.state.avatarImage.name} className={classes.chip}/> : null}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <FacebookLogin />
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
