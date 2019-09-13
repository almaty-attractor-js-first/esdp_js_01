import React from 'react';
import { Container, Spinner, Content } from 'native-base';
import HeaderTitleSubtitleExample from "../components/Header";
import FooterTabsExample from "../components/Footer";
import FABExample from "../components/FloatingButton";
import ListIconExample from "../components/ListExample";

class Main extends React.Component {


  componentDidMount() {
    this.props.fetchReddit();
  }

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

const mapStateToProps = state => {
  return {
    list: state.list,
    loading: state.loading,
    err: state.err,
    after: state.after
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReddit: () => dispatch(fetchReddit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
