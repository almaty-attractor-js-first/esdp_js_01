import React, {Component} from "react";
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import FormElement from "../UI/FormElement/FormElement";


class OrderForm extends Component {
	cleaningTypes = [
		{
			_id: 1,
			type: "Сухая"
		},
		{
			_id: 2,
			type: "Мокрая"
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
		deliveryDate: "",
		count: 0
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
					title="Имя"
					type="text"
					required
					name="name"
					placeholder="Enter your name"
					value={this.state.name}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Фамилия"
					type="text"
					required
					name="surname"
					placeholder="Enter your surname"
					value={this.state.surname}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Отчество"
					type="text"
					required
					name="patronymic"
					placeholder="Enter your patronymic"
					value={this.state.patronymic}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Телефон"
					type="text"
					required
					name="phone"
					placeholder="Enter your phone"
					value={this.state.phone}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Количество"
					type="text"
					required
					name="quantity"
					placeholder="Enter your quantity"
					value={this.state.quantity}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Тип чистки"
					type="select"
					required
					options={this.cleaningTypes}
					name="cleaningType"
					placeholder="Cleaning Type"
					value={this.state.cleaningTypes}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Цена"
					type="text"
					required
					name="price"
					placeholder="Total"
					value={this.state.price}
					onChange={this.inputChangeHandler}
				/>
				<FormElement
					title="Тип доставки"
					type="select"
					required
					options={this.props.deliveryType}
					name="deliveryType"
					placeholder="Delivery Type"
					value={this.state.deliveryType}
					onChange={this.inputChangeHandler}
				/>
				<Row>
					<Col md={{offset:5, size: 10}}>
						<div>
							<Button> - </Button>
							<span> Количество пар: {this.state.count} </span>
							<Button> + </Button>
						</div>
					</Col>
				</Row>

				<FormGroup className="mt-3 ml-4" row>
					<Col sm={{offset:5, size: 10}}>
						<Button type="submit" color="primary">Оформить заказ</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}

}

export default OrderForm;
