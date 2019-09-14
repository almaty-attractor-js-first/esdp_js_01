import React, {Fragment} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import withLoadingHandler from "./HOC/withLoadingHandler";
import axios from "./axios-api";
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";
import Layout from "./containers/Layout/Layout";
import 'react-perfect-scrollbar/dist/css/styles.css';

const App = props => {

  return (
        <Fragment>
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
const mapDispatchToProps = dispatch => bindActionCreators({logoutUser}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLoadingHandler(App, axios)));
