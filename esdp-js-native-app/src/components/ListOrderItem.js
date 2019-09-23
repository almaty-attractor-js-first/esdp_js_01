import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Order from "../screens/Order";
import {Body, Button, Left, ListItem, Right} from "native-base";

const ListOrderItem = props => {
    return (
        <ListItem icon onPress={() => {Actions.Order(); }} title={Order}>
            <Left>
                <Text>{props.id}</Text>
            </Left>
            <Body>
                <Text>{props.address}</Text>
            </Body>
            <Right>
                <Button bordered success>
                    <Text>
                        Позвонить
                    </Text>
                </Button>
            </Right>
        </ListItem>
    )
};

export default ListOrderItem;



