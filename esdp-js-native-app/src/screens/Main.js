import React from 'react';
import { Container, Spinner, Content } from 'native-base';
import HeaderTitleSubtitleExample from "../components/Header";
import FooterTabsExample from "../components/Footer";
import FABExample from "../components/FloatingButton";
import ListIconExample from "../components/ListExample";

class Main extends React.Component {

  render() {


    return (
      <Container>
        <HeaderTitleSubtitleExample />
        <Content>

        {this.props.loading
          ?
          <Spinner color='blue' />
          :
          <ListIconExample />
        }
        </Content>

        {/*<FABExample/>*/}
        <FooterTabsExample/>
      </Container>
    );
  }
}



export default Main;
