import React, { Component, useEffect } from 'react';
import { Button, ListItem, Text, Left, Body, Right, Switch, Icon } from 'native-base';
import Order from '../screens/Order';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getOrders} from "../store/actions/ordersActions";



const ListItems = props => {
    useEffect(() => {
        props.getOrders();
    }, []);

		return (
			<ScrollView>
                {state.orders.map((place, i) => (
                    <ListItem
                        id={place.id}
                        key={i}
                        address={place.deliveryAddress}
                        onPress={() => {Actions.Order(); }} title={Order}
                    />
                ))}

                <ListItem icon onPress={() => {Actions.Order(); }} title={Order}>
					<Left>
							<Text>#24145</Text>
					</Left>
					<Body>
						<Text>Satpaeva 32a</Text>
					</Body>
					<Right>
						<Button bordered success>
							<Text>
								Позвонить
							</Text>
						</Button>
					</Right>
				</ListItem>

				<ListItem icon onPress={() => {Actions.Order(); }} title={Order}>
					<Left>
						<Text>#34456</Text>
					</Left>
					<Body >
						<Text>Djandosova 3</Text>
					</Body>
					<Right>
						<Button bordered success>
							<Text>
								Позвонить
							</Text>
						</Button>
					</Right>
				</ListItem>
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
