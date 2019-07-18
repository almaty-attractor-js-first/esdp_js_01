import React from "react";
import {Redirect, Route, Switch} from "react-router";
import Orders from "./containers/Orders/Orders";
import Main from "./containers/Main/Main";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewOrder from "./containers/NewOrder/NewOrder";

const ProtectedRoute = props => {
    return props.isAllowed ? <Route {...props} /> : <Redirect to="/" />
};

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/orders" exact component={Orders}/>
            {/*<ProtectedRoute*/}
            {/*    // path="/cocktails/notpublished"*/}
            {/*    // component={NotPublished}*/}
            {/*    isAllowed={user && user.role === "admin"}*/}
            {/*/>*/}
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/neworder" component={NewOrder}/>
        </Switch>
    )
};

export default Routes;
