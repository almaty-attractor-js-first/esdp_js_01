import React from 'react';
import {connect} from "react-redux";
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
		console.log(editable);
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
						<TableBody>
							{props.statuses.map((row, index) => {
								return (
									<TableRow
										hover
										role="checkbox"
										key={row.name}
									>
										<TableCell padding="checkbox">
											<Tooltip title="Редактировать">
												<IconButton aria-label="edit" color='secondary' onClick={handleSetEditable}>
													<Edit />
												</IconButton>
											</Tooltip>
										</TableCell>
										<TableCell align="right" className={classes.tableCell}>
											{editable ?
												row.name :
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
											{editable ?
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
											<MuiColorPicker color={row.color}/>
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
									</TableRow>
									);
								})}
						</TableBody>
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
