import {TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import dateFns from "@date-io/date-fns";



const TableOrderRow = (props) => {
	return (
		<TableBody>
			{
				props.orders.map(order => (
					<TableRow
						hover
						key={order.id}
					>
						<TableCell>{order.ref}</TableCell>
						<TableCell>{order.masterName}</TableCell>
						<TableCell>{order.customer.firstName} {order.customer.lastName}</TableCell>
						<TableCell>
							{/*{moment(order.createdAt).format('DD/MM/YYYY')}*/}
							{/*{dateFns.format(new Date(order.createdAt), 'MM/DD/YYYY')}*/}
						</TableCell>
						<TableCell>{order.deliveryType}</TableCell>
						<TableCell>{order.paymentState}</TableCell>
						<TableCell>{order.takeToWork}</TableCell>
						<TableCell>
							<div className={props.statusContainer}>

								{order.statusJob}
							</div>
						</TableCell>
					</TableRow>
				))
			}
		</TableBody>
	);
};

export default TableOrderRow;

