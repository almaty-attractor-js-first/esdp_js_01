import React from "react";
import PropTypes from 'prop-types';
import {DragHandle, TableRowSortable} from "./SortableElements";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import SubmitIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import DragHandleIcon from '@material-ui/icons/DragIndicator';
import Edit from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import MuiColorPicker from "./MaterialColorPicker";
import Switch from "@material-ui/core/Switch";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	tableCell: {
		minWidth: '200px',
		maxWidth: '200px'
	},
	tableRow: {
		background: '#ffffff',
	},
	editCell: {
		maxWidth: '50px'
	},
	colorPicker: {
		maxWidth: '40px'
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

export default function StatusesTableRow (props) {
	const classes = useStyles();
	return (
		<TableRowSortable
			id={'status' + props.index}
			hover
			index={props.index}
			role="checkbox"
			className={classes.tableRow}
		>
			<TableCell align="right" className={classes.colorPicker}>
				<DragHandle>
					<IconButton color='primary' id={'draggable' + props.index}>
						<DragHandleIcon />
					</IconButton>
				</DragHandle>
			</TableCell>
			<TableCell padding="checkbox" className={classes.editCell}>
				
				{!props.row.editable ?
					<Tooltip title="Редактировать">
						<IconButton aria-label="edit"
						            color="secondary"
						            data-edit-button={props.index}
						            onClick={() => props.handleSetEditable(props.row.id)}>
							<Edit/>
						</IconButton>
					</Tooltip> :
					<>
						<Tooltip title="Сохранить">
							<IconButton aria-label="edit"
							            data-submit-button={props.index}
							            color="primary"
							            style={{marginRight: "10px"}}
							            onClick={() => props.handleSubmitChanges(props.row.id)}>
								<SubmitIcon/>
							</IconButton>
						</Tooltip>
						<Tooltip title="Отменить">
							<IconButton aria-label="edit"
							            data-discard-button={props.index}
							            color="secondary"
							            style={{marginRight: "10px"}}
							            onClick={() => props.handleDiscardChanges(props.row.id)}>
								<CancelIcon/>
							</IconButton>
						</Tooltip>
					</>
				}
			</TableCell>
			<TableCell align="right" className={classes.tableCell} id={'statusName' + props.index}>
				{props.row.editable ?
					<TextField
						name={"name"}
						value={props.row.name}
						onChange={e => props.inputChangeHandler(e, props.row.id)}
						margin="none"
						id={"name" + props.index}
						inputProps={{
							style: {textAlign: 'right'}
						}}
					/> :
					props.row.name
				}
			</TableCell>
			<TableCell align="right" className={classes.tableCell}>
				{props.row.editable ?
					<TextField
						name={"title"}
						value={props.row.title}
						onChange={e => props.inputChangeHandler(e, props.row.id)}
						margin="none"
						id={"title" + props.index}
						inputProps={{
							style: {textAlign: 'right'}
						}}
					/> :
					props.row.title
				}
			</TableCell>
			<TableCell align="right" className={classes.colorPicker}>
				<MuiColorPicker color={props.row.color} editable={props.row.editable} id={props.row.id}/>
			</TableCell>
			<TableCell align="right">
				<div>
					<Switch
						disabled={!props.row.editable}
						checked={props.row.status}
						onChange={e => props.handleOnOffStatus(e, props.row.id)}
						value={props.row.status}
						color="primary"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
				</div>
			</TableCell>
		</TableRowSortable>
	);
}


StatusesTableRow.propTypes = {
	index: PropTypes.number.isRequired,
	row: PropTypes.object.isRequired,
	handleSetEditable: PropTypes.func.isRequired,
	handleSubmitChanges: PropTypes.func.isRequired,
	handleDiscardChanges: PropTypes.func.isRequired,
	inputChangeHandler: PropTypes.func.isRequired,
	handleOnOffStatus: PropTypes.func.isRequired
};
