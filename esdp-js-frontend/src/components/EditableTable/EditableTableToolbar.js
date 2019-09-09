import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import NoteAdd from "@material-ui/icons/NoteAdd";

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
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center'
	},
	title: {
		flex: '0 0 auto',
	},
}));

export default function EditableTableToolbar(props) {
	const classes = useToolbarStyles();
	
	return (
		<Toolbar>
			<div>
				<Typography variant="h5" id="tableTitle">
					{props.heading}
				</Typography>
			</div>
			
			<div className={classes.spacer} />
			<div className={classes.actions}>
				<Typography>
					Добавить
				</Typography>
				{(
					<Tooltip title={props.tooltipTitle}>
						<IconButton aria-label="Add" onClick={props.handleAdd}>
							<NoteAdd color='secondary'/>
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

EditableTableToolbar.propTypes = {
	handleAdd: PropTypes.func.isRequired,
	heading: PropTypes.string.isRequired,
	tooltipTitle: PropTypes.string.isRequired
};
