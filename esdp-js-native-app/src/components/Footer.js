import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class FooterTabsExample extends Component {
	render() {
		return (
			<Footer>
				<FooterTab>
					<Button vertical active onPress= {() => {Actions.pop(); }}>
						<Icon name="apps" />
						<Text>Заказы</Text>
					</Button>
					<Button vertical onPress= {() => {Actions.pageTwo(); }}>
						<Icon name="camera" />
						<Text>Камера</Text>
					</Button>
					<Button vertical>
						<Icon active name="navigate" />
						<Text>Карта</Text>
					</Button>
					<Button vertical>
						<Icon name="person" />
						<Text>Кабинет</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}