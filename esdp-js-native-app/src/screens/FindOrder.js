import React from 'react';
import {Container, Spinner, Content, Form, Item, Input, Text, Button, StyleProvider, Icon, ListItem} from 'native-base';
import HeaderApp from "../components/Header";
import FooterTabsExample from "../components/Footer";
import {Actions} from "react-native-router-flux";
import Order from "./Order";

class FindOrder extends React.Component {
    state = {
        id: ""
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        Actions.Order({id: this.state.id});
        console.log('find by Id');
    };
    render() {
        return (
            <Container>
                <HeaderApp />
                <Content>
                    {this.props.loading
                        ?
                        <Spinner color='blue' />
                        :
                        <Form>
                            <Item>
                                <Input placeholder="Id" onChangeText={(text) => this.setState({id: text})} value={this.state.id}/>
                            </Item>
                            <Button bordered success block onPress={this.onSubmitHandler}>
                                <Icon name='arrow-forward' />
                            </Button>
                        </Form>
                    }
                </Content>
                <FooterTabsExample/>
            </Container>
        );
    }
}

export default FindOrder;

