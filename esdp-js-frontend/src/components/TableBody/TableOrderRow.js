import {Button, TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import moment from "moment";
import FormHelperText from '@material-ui/core/FormHelperText';
import {withRouter} from "react-router";

const TableOrderRow = (props) => {

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
										color="primary"
									>
										{statusToButton[order.status]}
									</Button>
								</TableCell>
							</TableRow>
						)
					}
				})
			}
		</TableBody>
	);
};

export default withRouter(TableOrderRow);

