import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Body } from "native-base";
import FooterTabsExample from "../components/Footer";
import HeaderTitleSubtitleExample from "../components/Header";

class Order extends Component {
    render() {
        return (
            <Container>
                <HeaderTitleSubtitleExample />
                <Content padder>

                    {this.props.loading
                        ?
                        <Spinner color='blue' />
                        :
                        <Card>
                            <CardItem header bordered>
                                <Text>NativeBase</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>

                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem footer bordered>
                                <Text>GeekyAnts</Text>
                            </CardItem>
                        </Card>
                    }

                </Content>
                <FooterTabsExample/>
            </Container>
        );
    }
}


export default Order;
