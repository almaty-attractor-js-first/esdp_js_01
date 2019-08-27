import {Button, makeStyles, TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import moment from "moment";
import FormHelperText from '@material-ui/core/FormHelperText';
import {withRouter} from "react-router";
import cx from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';


const useStyles = makeStyles(theme => ({
	red: {
		color: 'red'
	},
	green: {
		color: 'green'
	},

}));


const TableOrderRow = (props) => {
	const classes = useStyles();
 	const statusToButton = {
		"pending": "Взять в работу",
		"inWork": "Закончить работу",
		"completed": "Закончено"
	};

	const { history } = props;
	return (
		<TableBody >
			{
				props.orders.map((order, index) => {
					if (order.status === "pending" || order.status === "inWork" ) {
						return (
							<TableRow
								hover
								key={index}
								onClick={() => history.push(`order/${order.id}`)}
							>
								<TableCell>
									{order.id}
									<FormHelperText>{moment(order.createdAt).format('DD.MM.YYYY HH:mm')}</FormHelperText>
								</TableCell>
								<TableCell>{order.masterId}</TableCell>
								<TableCell>{order.firstName} {order.lastName}</TableCell>
								<TableCell>
									{moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
								</TableCell>
								<TableCell>{order.deliveryType === 'self' ? 'Самовывоз' : 'Доставка'}</TableCell>
								<TableCell>{order.paymentStatus ? 'Оплачен' : 'Не оплачен'}</TableCell>
								<TableCell className={props.statusContainer}>
									<Button
										onClick={(e) => {props.changeStatusButton(order.id, order.status);
											e.stopPropagation()}}
										size="small"
										className={order.status === 'pending'? classes.green : classes.red}
									>
										{statusToButton[order.status]}
									</Button>
								</TableCell>
							</TableRow>
						)
					} else {
						return null
					}
				})
			}
		</TableBody>
	);
};

export default withRouter(TableOrderRow);

