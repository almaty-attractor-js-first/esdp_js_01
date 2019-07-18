import React, {Component} from "react";
import {Form} from "reactstrap";
import FormElement from "../UI/FormElement/FormElement";


class OrderForm extends Component {
	cleaningType = [
		{
			dry: 500
		}
	];

	state = {
		firstName: "",
		lasName: "",
		patronymic: "",
		phone: "",
		quantity: "",
		price: 0,
		deliveryType: "",
		address: "",
		deliveryDate: ""
	};
	inputChangeHandler = (event) => {
		this.setState({[event.target.name]: event.target.value})
	};
	submitFormHandler = (event) => {
		event.preventDefault();
	};
	render() {
		return (
			<Form onSubmit={this.submitFormHandler}>
				<FormElement
					title="Name"
					type="text"
					required
					name="firstName"
					placeholder="Enter your name"
					value={this.state.firstName}
					onChange={this.inputChangeHandler}
				/>
			</Form>
		)
	}
}

export default OrderForm;