import React, {Component} from 'react';
import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import {Button} from 'reactstrap';
import config from "../../config";
import {facebookLogin} from "../../store/actions/usersActions";
import {connect} from "react-redux";

class FacebookLogin extends Component {
    facebookResponse = response => {
        if(response.id) {
            this.props.facebookLogin(response);
        }
    };
    render () {
        return (
            <FacebookLoginButton
                appId={config.facebookAppId}
                fields="name,email,picture"
                render={(renderProps) => {
                    return (
                        <Button onClick={renderProps.onClick}>
                            Login with Facebook
                        </Button>
                    );
                }}
                callback={this.facebookResponse}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        facebookLogin: (data) => dispatch(facebookLogin(data))
    };
};

export default connect(null, mapDispatchToProps)(FacebookLogin);