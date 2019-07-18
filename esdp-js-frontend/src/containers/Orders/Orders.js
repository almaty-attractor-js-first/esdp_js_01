import React, {Component, Fragment} from 'react';
import {Row} from "reactstrap";
import {connect} from "react-redux";
import OrderItem from "../../components/OrderItem/OrderItem";
import {fetchOrders} from "../../store/actions/actions";
import './Orders.css';

class Orders extends Component {
    componentDidMount() {
        //this.props.onFetchOrders();
    }

    render() {
        return (
            <Fragment>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="Orders-h1">
                        Ваши заказы, {this.props.user.displayName ? this.props.user.displayName : this.props.user.username}
                    </h1>
                </div>
                <Row>
                    {
                        this.props.orders.map(order => {
                            return (
                                <OrderItem
                                    id={order._id}
                                    key={order._id}
                                    date={order.date}
                                    price={order.price}
                                    name={order.name}
                                    surname={order.surname}
                                    middlename={order.middlename}
                                    telephone={order.telephone}
                                    typeofcleaning={order.typeofcleaning}
                                    numberofpairs={order.numberofpairs}
                                    email={order.email}
                                    delivery={order.deliverytype}
                                    address={order.address}
                                />
                            );
                        })
                    }
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        user: state.users.user
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
