import React, { Component } from 'react';
import { Header, Left, Body, Right, Title, Subtitle } from 'native-base';


export default class HeaderTitleSubtitleExample extends Component {
  render() {
    return (
          <Header noLeft>
            <Left />
            <Body>
              <Title>Shoeser</Title>
              <Subtitle note numberOfLines={1}>Химчистка кроссовок</Subtitle>
            </Body>
            <Right />
          </Header>
    );
  }
}
