import MaterialColorPicker from 'react-material-color-picker';
import React from "react";
import Colorize from '@material-ui/icons/Colorize';
import IconButton from "@material-ui/core/IconButton";


const MuiColorPicker = (props) => {
	const [isEdit, setIsEdit] = React.useState(false);
	const [color, setColor] = React.useState(props.color);
	const handleChange = () => {
		props.editable
			?
			setIsEdit(!isEdit)
			:
			setIsEdit(false)
	};
	const onSubmit = (event) => {
		setIsEdit(false);
		setColor(event.target.value);
	};
	
	
	return (
		isEdit ?
		<MaterialColorPicker
			initColor={props.color}
			onSubmit={onSubmit}
			// onReset={actionLog()}
			style={{width: 400, backgroundColor: '#c7c7c7', position: "absolute", left: "30%", zIndex: "999999"}}
			submitLabel='Apply'
			resetLabel='Undo'
		/> :
		<IconButton onClick={handleChange}
		     style={{
					background: color,
		     }}>
			<Colorize style={{
				width: "25px",
				height: "25px",
				color: '#fff',
			}}/>
		</IconButton>
	)
};

export default MuiColorPicker;