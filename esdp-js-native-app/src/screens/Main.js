import React from 'react';
import { Container, Spinner, Content } from 'native-base';
import HeaderApp from "../components/Header";
import FooterTabsExample from "../components/Footer";
import ListItems from "../components/ListItems";

class Main extends React.Component {

  render() {


    return (
      <Container>
        <HeaderApp/>
        <Content>

        {this.props.loading
          ?
          <Spinner color='blue' />
          :
          <ListItems />
        }
        </Content>

        <FooterTabsExample/>
      </Container>
    );
  }
}



export default Main;
