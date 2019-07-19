import React, {Component} from "react";
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/FormElement/FormElement";


class OrderForm extends Component {
	cleaningType = [
		{
			dry: 500
		}
	];

	state = {
		name: "",
		surname: "",
		patronymic: "",
		phone: "",
		quantity: "",
		cleaningType: "",
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
					name="name"
					placeholder="Enter your name"
					value={this.state.name}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Surname"
					type="text"
					required
					name="surname"
					placeholder="Enter your surname"
					value={this.state.surname}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Patronymic"
					type="text"
					required
					name="patronymic"
					placeholder="Enter your patronymic"
					value={this.state.patronymic}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Phone"
					type="text"
					required
					name="phone"
					placeholder="Enter your phone"
					value={this.state.phone}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Quantity"
					type="text"
					required
					name="quantity"
					placeholder="Enter your quantity"
					value={this.state.quantity}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Cleaning Type"
					type="select"
					required
					options={this.props.cleaningType}
					name="cleaningType"
					placeholder="Cleaning Type"
					value={this.state.cleaningType}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Price"
					type="text"
					required
					name="price"
					placeholder="Total"
					value={this.state.price}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Delivery Type"
					type="select"
					required
					options={this.props.deliveryType}
					name="deliveryType"
					placeholder="Delivery Type"
					value={this.state.deliveryType}
					onChange={this.inputChangeHandler}
				/>
				<FormGroup row>
					<Col sm={{offset:2, size: 10}}>
						<Button type="submit" color="primary">Сохранить</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}

}

export default OrderForm;