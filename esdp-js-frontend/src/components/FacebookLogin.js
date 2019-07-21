import React, {Component} from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";

import config from "../config";
import {facebookLogin} from "../store/actions/usersActions";

class FacebookLogin extends Component {
    facebookResponse = response => {
        console.log("facebook response", response);
        if (response.id) {
            this.props.facebookLogin(response);
        }
    };
    render() {
        return (
            <FacebookLoginButton
                appId={config.facebookAppId}
                fields="name,email,picture"
                render={(renderProps) => {
                    return (
                        <Button onClick={renderProps.onClick}
                                color="primary"
                                fullWidth
                                variant="contained"
                        >
                            Login with Facebook
                        </Button>
                    );
                }}
                callback={this.facebookResponse}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        facebookLogin: (data) => dispatch(facebookLogin(data))
    };
};

export default connect(null, mapDispatchToProps)(FacebookLogin);
