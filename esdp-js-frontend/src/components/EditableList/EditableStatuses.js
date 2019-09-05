import React, {Fragment} from 'react';
import {connect} from "react-redux";
import arrayMove from "array-move";
import uuid from 'uuid'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import DragHandleIcon from '@material-ui/icons/DragIndicator';
import SubmitIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import NoteAdd from '@material-ui/icons/NoteAdd';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiColorPicker from './MaterialColorPicker'
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc'

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

const headRows = [
	{ label: 'Редактировать' },
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
					Тянуть
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
						<IconButton aria-label="Add" onClick={props.handleAddNewStatus}>
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

function EnhancedTable(props) {
	const [statuses, setStatuses] = React.useState([]);
	const [changedStatuses, setChangedStatuses] = React.useState('');
	const classes = useStyles();
	
	React.useEffect(() => {
		const defaultStatuses = JSON.stringify(props.statuses);
		setChangedStatuses(defaultStatuses);
	},[]);
	
	
	const handleAddNewStatus = () => {
		const tempStatuses = [...statuses];
		const newStatus = {
			id: uuid.v4(),
			editable: true,
			name: '',
			title: '',
			color: '#000',
			status: false,
			position: null
		};
		tempStatuses.unshift(newStatus);
		setStatuses(tempStatuses);
	};
	
	const editCurrentStatus = (id) => {
		const tempStatuses = [...statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].status = !tempStatuses[index].status;
		setStatuses(tempStatuses);
	};
	
	const handleSetEditable = (id) => {
		const tempStatuses = [...statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].editable = !tempStatuses[index].editable;
		setStatuses(tempStatuses);
	};
	
	const handleSubmitChanges = id => {
		const tempStatuses = [...statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].editable = !tempStatuses[index].editable;
		setStatuses(tempStatuses);
		const newStatuses = JSON.stringify(props.statuses);
		setChangedStatuses(newStatuses);
	};
	
	const handleDiscardChanges = (id) => {
		const tempStatuses = [...statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].editable = !tempStatuses[index].editable;
		const oldStatuses = JSON.parse(changedStatuses);
		setStatuses(oldStatuses);
	};
	
	
	React.useEffect(() => {
		const tempStatuses = [...props.statuses];
		tempStatuses.forEach(elem => elem.editable = false);
		setStatuses(tempStatuses);
	}, []);
	
	// Обработчик завершения перемещения, используется helper array-move
	const onSortEnd = ({oldIndex, newIndex}) => {
		let tempStatuses = [...statuses];
		tempStatuses = arrayMove(tempStatuses, oldIndex, newIndex);
		tempStatuses.forEach((elem, index) => (
			elem.position = index + 1
		));
		setStatuses(tempStatuses);
	};
	
	const inputChangeHandler = (event, id) => {
		const tempStatuses = [...statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index][event.target.name] = event.target.value;
		setStatuses(tempStatuses);
	};
	
	
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar handleAddNewStatus={handleAddNewStatus}/>
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size='small'
					>
						<EnhancedTableHead
							classes={classes}
							rowCount={statuses.length}
						/>
						<TableBodySortable onSortEnd={onSortEnd}
						                   useDragHandle lockAxis='y'
						                   transitionDuration={500}
							displayRowCheckbox={false}>
							{statuses.map((row, index) => {
								return (
										<TableRowSortable
											hover
											key={index}
											index={index}
											role="checkbox"
											className={classes.tableRow}
										>
											<TableCell align="right" className={classes.colorPicker}>
												<DragHandle>
													<IconButton color='primary'>
														<DragHandleIcon />
													</IconButton>
												</DragHandle>
											</TableCell>
											<TableCell padding="checkbox" className={classes.editCell}>
												
													{!row.editable ?
														<Tooltip title="Редактировать">
															<IconButton aria-label="edit"
															            color="secondary"
															            onClick={() => handleSetEditable(row.id)}>
																<Edit/>
															</IconButton>
														</Tooltip> :
														<>
														<Tooltip title="Сохранить">
															<IconButton aria-label="edit"
															            color="primary"
															            style={{marginRight: "10px"}}
															            onClick={() => handleSubmitChanges(row.id)}>
																<SubmitIcon/>
															</IconButton>
														</Tooltip>
														<Tooltip title="Отменить">
															<IconButton aria-label="edit"
															            color="secondary"
															            style={{marginRight: "10px"}}
															            onClick={() => handleDiscardChanges(row.id)}>
																<CancelIcon/>
															</IconButton>
														</Tooltip>
														</>
													}
											</TableCell>
											
											
											<TableCell align="right" className={classes.tableCell}>
											{row.editable ?
												<TextField
													name="name"
													value={row.name}
													onChange={e => inputChangeHandler(e, row.id)}
													margin="none"
													inputProps={{
														style: {textAlign: 'right'}
													}}
												/> :
												row.name
											}
											</TableCell>
											<TableCell align="right" className={classes.tableCell}>
												{row.editable ?
													<TextField
														name="title"
														value={row.title}
														onChange={e => inputChangeHandler(e, row.id)}
														margin="none"
														inputProps={{
															style: {textAlign: 'right'}
														}}
													/> :
													row.title
												}
											</TableCell>
											<TableCell align="right" className={classes.colorPicker}>
												<MuiColorPicker color={row.color} editable={row.editable}/>
											</TableCell>
											<TableCell align="right">
												<div>
													<Switch
														checked={row.status}
														onChange={() => editCurrentStatus(row.id)}
														value={row.status}
														color="primary"
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
		</div>
	);
}

const mapStateToProps = state => {
	return {
		statuses: state.orders.statuses
	};
};

export default connect(mapStateToProps)(EnhancedTable);
