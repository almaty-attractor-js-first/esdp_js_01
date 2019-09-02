import MaterialColorPicker from 'react-material-color-picker';
import React from "react";
import Button from "@material-ui/core/Button";
import Colorize from '@material-ui/icons/Colorize';
import Edit from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";


const MuiColorPicker = (props) => {
	const [isEdit, setIsEdit] = React.useState(false);
	const handleChange = () => {
		props.editable
			?
			setIsEdit(!isEdit)
			:
			setIsEdit(false)
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
			style={{width: 400, backgroundColor: '#c7c7c7', position: "absolute", left: "30%", zIndex: "999999"}}
			submitLabel='Apply'
			resetLabel='Undo'
		/> :
		<IconButton onClick={handleChange}
		     style={{
					background: props.color,
		     }}>
			<Colorize style={{
				width: "20px",
				height: "20px",
				color: '#fff',
			}}/>
		</IconButton>
	)
};

export default MuiColorPicker;