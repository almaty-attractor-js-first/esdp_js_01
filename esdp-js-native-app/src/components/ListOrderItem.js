import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Order from "../screens/Order";
import {Body, Button, Left, ListItem, Right} from "native-base";

const ListOrderItem = props => {
    return (
        <ListItem icon onPress={() => {Actions.Order({id: props.id}); }} title={Order}>
            <Left>
                <Text>{props.id.substr(0, 6)}</Text>
            </Left>
            <Body>
                <Text>{props.address}</Text>
            </Body>
            <Right>
                <Button bordered success>
                    <Text>
                        Позвонить {props.tel}
                    </Text>
                </Button>
            </Right>
        </ListItem>
    )
};

export default ListOrderItem;



