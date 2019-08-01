import React, { useState } from "react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function TimePicker() {
	const d = new Date();
	const [selectedDate, handleDateChange] = useState(d.setDate(d.getDate() + 5));

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				autoOk
				disablePast={true}
				ampm={false}
				minDate={d.setDate(d.getDate())}
				value={selectedDate}
				onChange={handleDateChange}
				label="Когда забирать"
				inputProps={{ style: {textAlign: 'center'} }}
			/>
		</MuiPickersUtilsProvider>

	);
}

export default TimePicker;
