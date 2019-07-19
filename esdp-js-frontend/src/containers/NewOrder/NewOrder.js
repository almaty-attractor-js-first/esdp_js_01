import React, {Component, Fragment} from "react";
import OrderForm from "../../components/OrderForm/OrderForm";

class NewOrder extends Component {
	render() {
		return (
			<Fragment>
				<h2>Оформить заказ</h2>
				<OrderForm/>
			</Fragment>
		)
	}
}

export default NewOrder;