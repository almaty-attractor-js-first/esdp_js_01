import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import Main from "./src/screens/Main";
import Login from "./src/screens/Login";
import Order from "./src/screens/Order";
import QRScreen from "./src/screens/QRScreen";
import FindOrder from "./src/screens/FindOrder";
import { AppLoading } from 'expo';
import { Router, Scene } from 'react-native-router-flux';
import store from './src/store/store-config';


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
      <Provider store={store}>
	      <Router hideNavBar="false">
		      <Scene key="root">
                  <Scene key="Login" hideNavBar={true} component={Login} initial={true} />

		      </Scene>
	      </Router>
      </Provider>
    );
  }
}

