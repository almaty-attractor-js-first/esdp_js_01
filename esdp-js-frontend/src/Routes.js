import React from "react";
import {Route, Switch} from "react-router";
import Register from "./containers/Register";
import Login from "./containers/Login";
import NewOrder from "./containers/NewOrder/NewOrder";
import OrderItems from "./containers/OrderItems";
import Main from "./containers/Main/Main";
// import OrderDetails from "./components/OrderDetails/OrderDetails";
import AdminOrderItems from "./containers/Orders";
import OrderDetailsEdit from "./components/OrderDetails/OrderDetailsEdit";
import Statuses from "./containers/Statuses";
import CleaningTypes from "./containers/CleaningTypes";
import SavedOrder from "./containers/SavedOrder";
import CurrentOrders from "./containers/CurrentOrders";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/new-order" component={NewOrder}/>
            <Route exact path="/orders/saved" component={SavedOrder}/>
            <Route exact path="/orders/current" component={CurrentOrders}/>
            <Route exact path="/order-items" component={OrderItems}/>
            <Route exact path="/orders" component={AdminOrderItems}/>
            {/*<Route exact path="/order/:id" component={OrderDetails}/>*/}
            <Route exact path="/edit-order/:id" component={OrderDetailsEdit}/>
            <Route exact path="/statuses/edit" component={Statuses}/>
            <Route exact path="/types/edit" component={CleaningTypes}/>
        </Switch>
    )
};

export default Routes;
