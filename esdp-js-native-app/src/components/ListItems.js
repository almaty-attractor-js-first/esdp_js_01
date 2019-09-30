import React, { useEffect } from 'react';
import Order from '../screens/Order';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getOrders} from "../store/actions/ordersActions";
import {connect} from "react-redux";
import ListOrderItem from "./ListOrderItem";

const ListItems = props => {
    useEffect(() => {
        props.getOrders();
        console.log('orders fetch');
    }, []);

		return (
			<ScrollView>
                {props.orders.map((place, i) => (
                    <ListOrderItem
                        id={place.id}
                        key={i}
                        address={place.address}
                        onPress={() => {Actions.Order(); }} title={Order}
                    />
                ))}
			</ScrollView>
		);

}
const mapStateToProps = state => {
    return {
        user: state.users.user,
        orders: state.orders.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(getOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);
