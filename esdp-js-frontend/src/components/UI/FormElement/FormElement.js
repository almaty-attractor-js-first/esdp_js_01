import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";

const FormElement = props => {
    let formControlChildren;

    if(props.type === "select" && props.options) {

        formControlChildren = props.options.map(option => {
            return (<MenuItem
                value={option._id}
                key={option._id}
            >
                {option.type}
            </MenuItem>)
        });
    }


    return (
        <FormGroup row>
            <Label sm={2} for="username">{props.title}</Label>
            <Col sm={10}>
                <Input
                    {...props}
                    type={props.type}
                    name={props.name} id={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    invalid={!!props.error}
                    required={props.required}
                >
                    {formControlChildren}
                </Input>
                {
                    props.error ?
                        <FormFeedback>
                            {props.error}
                        </FormFeedback> : null
                }

            </Col>
        </FormGroup>
    );
};

FormElement.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired
};

export default FormElement;
