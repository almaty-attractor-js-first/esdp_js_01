import React, { Component } from 'react';
import reducer from './src/store/reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import Main from "./src/screens/Main";
import thunk from 'redux-thunk';
import { AppLoading } from 'expo';
import { Router, Scene } from 'react-native-router-flux';
import QRScreen from "./src/screens/QRScreen";

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render(){
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return(
      <Provider store= {store}>
	      <Router hideNavBar="false">
		      <Scene key="root">
			      <Scene key="pageOne" hideNavBar={true} component={Main} initial={true} />
			      <Scene key="pageTwo" hideNavBar={true} component={QRScreen} title="PageTwo" />
		      </Scene>
	      </Router>
      </Provider>
    );
  }
}