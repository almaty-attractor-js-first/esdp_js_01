import React, {Component, Fragment} from "react";
import AddressForm from "../Ordering/Ordering";

class NewOrder extends Component {
	render() {
		return (
			<Fragment>
				<h2 className="text-center">Новый заказ</h2>
				<AddressForm/>
			</Fragment>
		)
	}
}

export default NewOrder;
