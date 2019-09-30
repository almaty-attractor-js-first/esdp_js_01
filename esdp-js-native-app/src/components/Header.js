import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text, Icon } from 'native-base';
import {Actions} from "react-native-router-flux";

class HeaderApp extends Component {
  render() {
    return (
          <Header noLeft>
              <Left>
                  <Button transparent onPress = {() => {Actions.pop(); }}>
                      <Icon name='arrow-back' />
                  </Button>
              </Left>
            <Body>
              <Title>Shoeser</Title>
              <Subtitle note numberOfLines={1}>Химчистка кроссовок</Subtitle>
            </Body>
              <Right>
                  {this.props.user ? (
                          <Button hasText transparent onPress = {() => {Actions.Login(); }}>
                              <Text>{this.props.user.firstName} Logout</Text>
                          </Button>
                      )
                      : (
                      <Button hasText transparent onPress = {() => {Actions.Login(); }}>
                          <Text>Login</Text>
                      </Button>
                  )}
              </Right>
          </Header>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

export default connect(mapStateToProps,null)(HeaderApp)
