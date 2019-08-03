import React from "react";
import {Route, Switch} from "react-router";
import Register from "./containers/Register";
import Login from "./containers/Login";
import NewOrder from "./containers/NewOrder/NewOrder";
import OrderItems from "./containers/OrderItems";
import Main from "./containers/Main/Main";

const Routes = ({user}) => {
    return (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/new-order" component={NewOrder}/>
            <Route exact path="/order-items" component={OrderItems}/>
        </Switch>
    )
};

export default Routes;
