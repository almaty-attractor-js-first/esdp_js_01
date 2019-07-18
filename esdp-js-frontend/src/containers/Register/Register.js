import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/FormElement/FormElement";

class Register extends Component {
    state = {
          username: '',
          password: ''
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
    getFieldError = (fieldName) => {
        return this.props.error && this.props.error.message &&
            this.props.error.message.errors && this.props.error.message.errors[fieldName] &&
            this.props.error.message.errors[fieldName].message;
    };

    render() {
        return (
            <Fragment>
                <h2>Register new user</h2>
                <Form onSubmit={this.onSubmitHandler}>
                    <FormElement
                        title="Username"
                        name="username"
                        value={this.state.username}
                        placeholder="Username"
                        type="text"
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                    />
                    <FormElement
                        title="Password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        type="password"
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                    />
                    <FormGroup row>
                        <Col sm={{offset:2, size: 10}}>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.users.registerError
    }
};
const mapDispatchToProps = dispatch => {
    return {
        registerUser: (userData) => dispatch(registerUser(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
