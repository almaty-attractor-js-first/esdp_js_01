import MaterialColorPicker from 'react-material-color-picker';
import React from "react";

const MuiColorPicker = (props) => {
	const [isEdit, setIsEdit] = React.useState(false);
	const handleChange = () => {
		console.log(isEdit);
		setIsEdit(!isEdit);
	};
	const onSubmit = () => {
		setIsEdit(false);
	};
	
	
	return (
		isEdit ?
		<MaterialColorPicker
			initColor={props.color}
			onSubmit={onSubmit}
			// onReset={actionLog()}
			style={{width: 400, backgroundColor: '#c7c7c7', position: "absolute", left: "30%", zIndex: "999"}}
			submitLabel='Apply'
			resetLabel='Undo'
		/> :
		<div onClick={handleChange}
		     style={{
					width: "25px",
					height: "25px",
					borderRadius: "3px",
					background: props.color
				}}/>
	)
};

export default MuiColorPicker;