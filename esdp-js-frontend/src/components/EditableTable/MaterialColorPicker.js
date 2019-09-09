import MaterialColorPicker from 'react-material-color-picker';
import React from "react";
import Colorize from '@material-ui/icons/Colorize';
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";
import {setCurrentStatusColor} from "../../store/actions/statusesActions";


const MuiColorPicker = (props) => {
	const [isEdit, setIsEdit] = React.useState(false);
	// const [color, setColor] = React.useState(props.color);
	
	const handleChange = () => {
		console.log(props.color);
		props.editable
			?
			setIsEdit(!isEdit)
			:
			setIsEdit(false)
	};
	const onSubmit = (event) => {
		setIsEdit(false);
		// setColor(event.target.value);
		props.setCurrentStatusColor(event.target.value, props.id);
	};
	
	
	return (
		isEdit ?
		<MaterialColorPicker
			initColor={props.color}
			onSubmit={onSubmit}
			// onReset={actionLog()}
			style={{width: 500, backgroundColor: '#c7c7c7', position: "absolute", left: "30%", zIndex: "999999"}}
			submitLabel='Apply'
			resetLabel=''
		/> :
		<IconButton onClick={handleChange}
		     style={{
					background: props.color,
		     }}>
			<Colorize style={{
				width: "25px",
				height: "25px",
				color: '#fff',
			}}/>
		</IconButton>
	)
};

const mapDispatchToProps = dispatch => {
	return {
		setCurrentStatusColor: (color, id) => dispatch(setCurrentStatusColor(color, id))
	}
};

export default connect(null, mapDispatchToProps)(MuiColorPicker);