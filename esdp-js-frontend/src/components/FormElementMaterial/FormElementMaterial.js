import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const FormElementMaterial = (props) => {

	return (
		<TextField
			type={props.type}
			variant="standard"
			margin="normal"
			required={props.required}
			fullWidth={props.fullWidth}
			value={props.value}
			label={props.label}
			name={props.name}
			autoFocus={props.autoFocus}
			onChange={props.onChange}
		/>

	);
};

FormElementMaterial.propTypes = {
	required: PropTypes.bool,
	type: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	autoFocus: PropTypes.bool,
	onChange: PropTypes.func.isRequired
};

export default FormElementMaterial;