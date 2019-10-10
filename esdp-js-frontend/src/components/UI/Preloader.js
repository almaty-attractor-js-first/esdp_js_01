import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = {
	preloader: {
		flexGrow: 1,
		marginBottom: 0,
		marginTop: 0,
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: '999',
	},
};

function IndeterminateLinearProgress (props) {
	const { classes } = props;
	return (
		<div>
			<LinearProgress className={classes.preloader} color="secondary" />
		</div>
	);
}

IndeterminateLinearProgress.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndeterminateLinearProgress);
