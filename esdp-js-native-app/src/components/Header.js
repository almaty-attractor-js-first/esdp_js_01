import React, { Component } from 'react';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text, Icon } from 'native-base';
import {Actions} from "react-native-router-flux";


export default class HeaderTitleSubtitleExample extends Component {
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
                  <Button hasText transparent onPress = {() => {Actions.Login(); }}>
                      <Text>Login</Text>
                  </Button>
              </Right>
          </Header>
    );
  }
}
