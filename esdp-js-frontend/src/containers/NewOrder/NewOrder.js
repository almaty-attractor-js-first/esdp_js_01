import React, {Component, Fragment} from "react";
import OrderForm from "../../components/OrderForm/OrderForm";
import AddressForm from "../Ordering/Ordering";

class NewOrder extends Component {
	render() {
		return (
			<Fragment>
				<h2 className="text-center">Новый заказ</h2>
				{/*<OrderForm/>*/}
				<AddressForm/>
			</Fragment>
		)
	}
}

export default NewOrder;