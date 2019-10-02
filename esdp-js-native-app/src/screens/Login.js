import React from 'react';
import { connect } from 'react-redux';
import { Container, Spinner, Content, Form, Item, Input, Text, Button, StyleProvider, Icon } from 'native-base';
import HeaderApp from "../components/Header";
import {loginUser} from "../store/actions/usersActions";
import QRCode from 'qrcode';

class Login extends React.Component {
    state = {
        phone: "",
        password: ""
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state);
        console.log('onsubmit');
    };
    render() {
    return (
        <Container>
            <HeaderApp/>
            <Content>
                {this.props.loading
                    ?
                    <Spinner color='blue'/>
                    :
                    <Form>
                        <Item>
                            <Input onChangeText={(text) => this.setState({phone: text})} value={this.state.phone}
                                   keyboardType="phone-pad" maxLength={11} autoCompleteType="tel" floatingLabel
                                   placeholder="Telephone"/>

                        </Item>
                        <Item last>
                            <Input onChangeText={(text) => this.setState({password: text})} value={this.state.password}
                                   secureTextEntry={true} floatingLabel placeholder="Password"/>
                        </Item>
                        <Button onPress={this.onSubmitHandler}
                                bordered success block>
                            <Icon name='arrow-forward'/>
                        </Button>
                    </Form>
                }
            </Content>

        </Container>
    );
    };
}

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

//export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login)
