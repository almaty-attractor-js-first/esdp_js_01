import React, {Fragment} from 'react';
import {connect} from "react-redux";
import arrayMove from "array-move";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import NoteAdd from '@material-ui/icons/NoteAdd';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiColorPicker from './MaterialColorPicker'
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc'

// Компонент который используется активации drag-n-drop при клике внутри компонента
const DragHandle = SortableHandle(({children}) => <Fragment>{children}</Fragment>);

// Универсальный компонент для превращения TableBody в sortable контейнер
const TableBodySortable = SortableContainer(({ children }) => (
	<TableBody>
		{children}
	</TableBody>
));

const TableRowSortable = SortableElement(({ children, ...props }) => (
	<TableRow {...props}>
		{children}
	</TableRow>
));

TableBodySortable.muiName = 'TableBody';
TableRowSortable.muiName = 'TableRow';




const rows = [
	{name: "pending", title: "В обработке", color: 'orange', status: true},
	{name: "inWork", title: "В работе", color: 'indigo', status: false}
];

const headRows = [
	{ label: 'Ключ' },
	{ label: 'Отображение' },
	{ label: 'Цвет' },
	{ label: 'Выкл' },
];

function EnhancedTableHead(props) {
	
	return (
		<TableHead>
			<TableRow>
				<TableCell>
					Редактировать
				</TableCell>
				{headRows.map(row => (
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

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
}));

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles();
	
	return (
		<Toolbar>
			<div>
				<Typography variant="h5" id="tableTitle">
					Cтатусы
				</Typography>
			</div>

			<div className={classes.spacer} />
			<div className={classes.actions}>
				{(
					<Tooltip title="Добавить новый статус">
						<IconButton aria-label="Add">
							<NoteAdd color='secondary'/>
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

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
		background: '#a6d0fb',
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

function EnhancedTable(props) {
	const classes = useStyles();
	const [dense, setDense] = React.useState(false);
	
	function handleChangeDense(event) {
		setDense(event.target.checked);
	}
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	});
	
	const handleChange = name => event => {
		setState({ ...state, [name]: event.target.checked });
	};
	const [editable, setEditable] = React.useState(false);
	const handleSetEditable = () => {
		setEditable(!editable);
	};
	
	const [statuses, setStatuses] = React.useState(props.statuses);
	
	// Обработчик заверщения перемещения, используется helper array-move
	const onSortEnd = ({oldIndex, newIndex}) => {
		const newStatuses = arrayMove(statuses, oldIndex, newIndex);
		console.log(newStatuses);
		setStatuses(newStatuses);
	};
	
	const editCurrentStatus = event => {
		console.log(event.target)
	};
	
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar />
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							classes={classes}
							rowCount={rows.length}
						/>
						<TableBodySortable onSortEnd={onSortEnd}
						                   useDragHandle lockAxis='y'
						                   transitionDuration={300}
							displayRowCheckbox={false}>
							{statuses.map((row, index) => {
								return (

										<TableRowSortable
											key={row.name}
											index={index}
											role="checkbox"
											className={classes.tableRow}
										>
											<DragHandle>
												<TableCell padding="checkbox">
													<Tooltip title="Редактировать">
														<IconButton aria-label="edit" color='secondary' onClick={editCurrentStatus}>
															<Edit />
														</IconButton>
													</Tooltip>
													:::
												</TableCell>
											</DragHandle>
											
											<TableCell align="right" className={classes.tableCell}>
												{!editable ?
													index + 1 :
													<TextField
														value={row.name}
														margin="none"
														inputProps={{
															style: {textAlign: 'right'}
														}}
													/>
												}
											</TableCell>
											<TableCell align="right" className={classes.tableCell}>
												{!editable ?
													row.title :
													<TextField
														value={row.title}
														margin="none"
														inputProps={{
															style: {textAlign: 'right'}
														}}
													/>
												}
											</TableCell>
											<TableCell align="right" className={classes.colorPicker}>
												<MuiColorPicker color={row.color} editable={editable}/>
											</TableCell>
											<TableCell align="right">
												<div>
													<Switch
														checked={state.checkedB}
														onChange={handleChange('checkedB')}
														value={state.checkedB}
														color="secondary"
														inputProps={{ 'aria-label': 'primary checkbox' }}
													/>
												</div>
											</TableCell>
										</TableRowSortable>
									
									);
								})}
						</TableBodySortable>
					</Table>
				</div>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		statuses: state.orders.statuses
	};
};

export default connect(mapStateToProps)(EnhancedTable);
