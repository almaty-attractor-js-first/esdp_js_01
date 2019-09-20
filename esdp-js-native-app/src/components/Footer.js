import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class FooterTabsExample extends Component {
	render() {
		return (
			<Footer>
				<FooterTab>
					<Button vertical active onPress= {() => {Actions.Orders(); }}>
						<Icon name="apps" />
						<Text>Заказы</Text>
					</Button>
					<Button vertical onPress= {() => {Actions.QRScreen(); }}>
						<Icon name="camera" />
						<Text>Камера</Text>
					</Button>
					<Button vertical onPress= {() => {Actions.FindOrder(); }}>
						<Text>Найти заказ</Text>
							<Text>по Id</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}
