import React from 'react';
import { Container, Spinner, Content, Form, Item, Input, Text, Button, StyleProvider, Icon } from 'native-base';
import HeaderTitleSubtitleExample from "../components/Header";
import FooterTabsExample from "../components/Footer";
import ListIconExample from "../components/ListExample";

class FindOrder extends React.Component {
    render() {
        return (
            <Container>
                <HeaderTitleSubtitleExample />
                <Content>
                    {this.props.loading
                        ?
                        <Spinner color='blue' />
                        :
                        <Form>
                            <Item>
                                <Input placeholder="Id" />
                            </Item>
                            <Button bordered success block>
                                <Icon name='arrow-forward' />
                            </Button>
                        </Form>
                    }
                </Content>

                <FooterTabsExample/>
            </Container>
        );
    }
}

export default FindOrder;

