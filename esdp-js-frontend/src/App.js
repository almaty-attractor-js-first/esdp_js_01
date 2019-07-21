import React, {Fragment} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";
import Layout from "./containers/Layout/Layout";

const App = props => {

  return (
        <Fragment>
          <NotificationContainer/>
          <Layout user={props.user}
                  logout={props.logoutUser}>
            <Routes user={props.user}/>
          </Layout>
        </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.user
  }
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
