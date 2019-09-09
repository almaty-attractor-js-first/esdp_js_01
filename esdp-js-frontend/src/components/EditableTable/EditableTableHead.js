import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import PropTypes from "prop-types";

export default function EditableTableHead(props) {
	
	return (
		<TableHead>
			<TableRow>
					{props.headRows.map(row => (
						<TableCell
							key={row.label}
							align='right'
						>
							{row.label}
						</TableCell>
					))}
			</TableRow>
		</TableHead>
	);
}

EditableTableHead.propTypes = {
	headRows: PropTypes.array.isRequired
};