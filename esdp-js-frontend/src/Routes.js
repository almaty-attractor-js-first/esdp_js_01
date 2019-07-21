import React from "react";
import {Route, Switch} from "react-router";
import Orders from "./containers/Orders/Orders";
import Main from "./containers/Main/Main";
import Register from "./containers/Register";
import Login from "./containers/Login";
import NewOrder from "./containers/NewOrder/NewOrder";

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/neworder" component={NewOrder}/>
        </Switch>
    )
};

export default Routes;
