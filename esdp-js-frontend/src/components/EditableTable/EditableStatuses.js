import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import {TableBodySortable} from "./SortableElements";
import StatusesTableRow from "./StatusesTableRow";
import EditableTableToolbar from "./EditableTableToolbar";
import EditableTableHead from "./EditableTableHead";

const headRows = [
	{ label: 'Тянуть' },
	{ label: 'Редактировать' },
	{ label: 'Ключ' },
	{ label: 'Отображение' },
	{ label: 'Цвет' },
	{ label: 'Вкл/Выкл' },
];

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

function EditableStatuses(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EditableTableToolbar handleAdd={props.handleAddNewStatus}
				                      heading="Статусы"
				                      tooltipTitle='Добавить новый статус'/>

				{props.statuses ?
					<div className={classes.tableWrapper}>
						<Table
							className={classes.table}
							aria-labelledby="tableTitle"
							size='small'
						>
							<EditableTableHead headRows={headRows}/>
							<TableBodySortable onSortEnd={props.onSortEnd}
							                   useDragHandle lockAxis='y'
							                   transitionDuration={200}
							                   displayRowCheckbox={false}>
								{props.statuses.map((row, index) => {
									return (
										<StatusesTableRow index={index}
										                  key={index}
										                  row={row}
										                  handleSetEditable={props.handleSetEditable}
										                  handleSubmitChanges={props.handleSubmitChanges}
										                  handleDiscardChanges={props.handleDiscardChanges}
										                  inputChangeHandler={props.inputChangeHandler}
										                  handleOnOffStatus={props.handleOnOffStatus}
										/>
									);
								})}
							</TableBodySortable>
						</Table>
					</div>
				: null}
			</Paper>
		</div>
	);
}

export default EditableStatuses;
