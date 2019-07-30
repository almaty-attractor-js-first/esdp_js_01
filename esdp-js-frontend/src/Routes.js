import React from "react";
import {Route, Switch} from "react-router";
import Register from "./containers/Register";
import Login from "./containers/Login";
import NewOrder from "./containers/NewOrder/NewOrder";
import Main from "./containers/Main/Main";

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" component={Main}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/new-order" component={NewOrder}/>
        </Switch>
    )
};

export default Routes;
