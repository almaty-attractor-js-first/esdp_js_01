import React, { useEffect, Component } from "react";
import { Container, Content, Card, CardItem, Text, Body, Spinner, Button, Image } from "native-base"
import FooterTabsExample from "../components/Footer";
import HeaderApp from "../components/Header";
import {getOrder, putUpdateOrder} from "../store/actions/ordersActions";
import {connect} from "react-redux";
import QRCode from 'qrcode';

class Order extends Component {
    // handleClick(id, newStatusId) => {
    //     this.props.putUpdateOrder(id, {statusId: newStatusId});
    //     let message = JSON.stringify({
    //         type: 'WS_TEST_CLIENT',
    //         message: 'TESTING...'
    //     });
    //     this.websocket.send(message);
    //     setState({message: ''});
    // };



    componentDidMount(){
        console.log(this.props.order);
        this.props.getOrder(this.props.id);
        //this.renderQR();
        // QRCode.toFile(`src/images/qrcode.png`, orderId, {
        //     scale: 10,
        //     color: {
        //         dark: '#000000',  //
        //         light: '#0000' // Transparent background
        //     }
        // }, function (err) {
        //     if (err) throw err;
        //     console.log('done')
        // });
    };


    render() {
        return (
            <Container>
                <HeaderApp/>
                <Content padder>

                    {this.props.loading
                        ?
                        <Spinner color='blue'/>
                        :
                        <Card>
                            <CardItem header bordered>
                                <Text>Заказ № {this.props.id}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>Адрес: {this.props.order.address}</Text>
                                    <Text>Доставить к: {this.props.order.completedDate}</Text>
                                    <Text>Тип доставки: {this.props.order.deliveryType}</Text>
                                    <Text>Метод оплаты: {this.props.order.paymentMethod}</Text>
                                    <Text>Стоимость: {this.props.order.totalPrice}</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer bordered>
                                <Text>Замечания: {this.props.order.description}</Text>
                            </CardItem>
                            <CardItem footer bordered>
                                <Button
                                    onPress={() => {this.handleClick()}}
                                    success
                                >
                                    <Text> Success </Text>
                                </Button>
                            </CardItem>
                        </Card>
                    }

                </Content>
                <FooterTabsExample/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        order: state.orders.currentOrder
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getOrder: (id) => dispatch(getOrder(id)),
        putUpdateOrder: (data) => dispatch(putUpdateOrder(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
