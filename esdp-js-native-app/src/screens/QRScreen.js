import React from 'react';
import { Container, Spinner, Content } from 'native-base';
import BarcodeScannerExample from "../components/BarCodeScanner";

class QRScreen extends React.Component {
	render() {
		return (
			<Container>
					{this.props.loading
						?
						<Spinner color='blue' />
						:
						<BarcodeScannerExample />
					}
			</Container>
		);
	}
}

export default QRScreen;
