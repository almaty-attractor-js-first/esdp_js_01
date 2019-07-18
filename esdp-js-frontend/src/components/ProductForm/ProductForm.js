import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../UI/FormElement/FormElement";

class ProductForm extends Component {
    state = {
        name: '',
        category: '',
        color: '#000000',
        photo: '',
        model: '',
        price: ''
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    fileChangeHandler = e => {
        this.setState({photo: e.target.files[0]});
    };

    submitFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in this.state) {
            formData.append(key, this.state[key]);
        }

        this.props.submitForm(formData);
    };

    componentDidUpdate(prevProps) {
        const categories = this.props.categories;
        if(categories.length > 0 && prevProps.categories !== this.props.categories) {
            this.setState({category: categories[0]._id});
        }
    }

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    title="Name"
                    type="text"
                    required
                    name="name"
                    placeholder="Enter product name"
                    value={this.state.name}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    title="Model"
                    type="text"
                    required
                    name="model"
                    placeholder="Enter product model"
                    value={this.state.model}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    title="Category"
                    type="select"
                    required
                    options={this.props.categories}
                    name="category"
                    placeholder="Enter product category"
                    value={this.state.category}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    title="Color"
                    type="color"
                    required
                    name="color"
                    placeholder="Enter product color"
                    value={this.state.color}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    title="Price"
                    type="number"
                    required
                    min="0"
                    name="price"
                    placeholder="Enter product price"
                    value={this.state.price}
                    onChange={this.inputChangeHandler}
                />

                <FormElement
                    title="Photo"
                    type="file"
                    name="photo"
                    onChange={this.fileChangeHandler}
                />

                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default ProductForm;
