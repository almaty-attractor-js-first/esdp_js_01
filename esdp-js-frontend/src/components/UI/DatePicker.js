import React, {useEffect, useState} from "react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

import "moment/locale/ru";
import {updateCompletedDate} from "../../store/actions/newOrderActions";
import {connect} from "react-redux";

const locale = 'ru';

function TimePicker(props) {

	const [selectedDate, handleDateChange] = useState(props.completedDate);

	useEffect(() => {
		const date = new Date(selectedDate).toISOString();
		props.updateCompletedDate(date);
	}, [selectedDate]);

	return (
		<MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
			<DatePicker
				autoOk
				disablePast={true}
				ampm={false}
				minDate={props.completedDate}
				value={selectedDate}
				onChange={handleDateChange}
				label="Когда забирать"
				inputProps={{ style: {textAlign: 'center'} }}
				format="DD.MM.YYYY"
			/>
		</MuiPickersUtilsProvider>

	);
}

const mapStateToProps = state => {
	return {
		completedDate: state.newOrder.completedDate,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateCompletedDate: (completedDate) => dispatch(updateCompletedDate(completedDate))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
