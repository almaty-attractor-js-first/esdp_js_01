import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import * as Permissions from 'expo-permissions';
import { Content } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
	state = {
		hasCameraPermission: null,
		scanned: false,
	};

	async componentDidMount() {
		this.getPermissionsAsync();
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	};

	render() {
		const { hasCameraPermission, scanned } = this.state;

		if (hasCameraPermission === null) {
			return <Text>Requesting for camera permission</Text>;
		}
		if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		}
		return (
			<>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>

				{scanned && (
					<Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
				)}
			</>
		);
	}

	handleBarCodeScanned = ({ type, data }) => {
		this.setState({ scanned: true });
		console.log(data, type);
		data.toString();
		Actions.Order({id: data});
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	}
}
