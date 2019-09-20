import React from 'react';
import { Container, Spinner, Content } from 'native-base';
import HeaderTitleSubtitleExample from "../components/Header";
import FooterTabsExample from "../components/Footer";
import BarcodeScannerExample from "../components/BarCodeScanner";

class QRScreen extends React.Component {

	render() {


		return (
			<Container>
				<HeaderTitleSubtitleExample />
				<Content>

				</Content>
				{this.props.loading
					?
					<Spinner color='blue' />
					:
					<BarcodeScannerExample />
				}
				<FooterTabsExample/>
			</Container>
		);
	}
}

export default QRScreen;
