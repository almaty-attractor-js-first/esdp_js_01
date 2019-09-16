import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import config from "../config";
import CurrentOrderCard from "../components/CurrentOrderCard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.background.paper,
			marginTop: theme.spacing(12),
		},
	}
}));

function CurrentOrder(props)  {
	const classes = useStyles();
	return (
		<Fragment>
			<CurrentOrderCard/>
			<CurrentOrderCard/>
			<CurrentOrderCard/>
		</Fragment>
	);
}

//image={`${config.apiURL}/uploads/${this.props.photo}`}


export default CurrentOrder;
