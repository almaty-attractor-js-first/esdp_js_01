import {Button, TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import moment from "moment";



const TableOrderRow = (props) => {
	return (
		<TableBody>
			{
				props.orders.map(order => (
					<TableRow
						hover
						key={order.id}
					>
						<TableCell>{order.id}</TableCell>
						<TableCell>{order.masterId}</TableCell>
						<TableCell>{order.firstname} {order.lastname}</TableCell>
						<TableCell>
							{moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
						</TableCell>
						<TableCell>{order.deliveryType}</TableCell>
						<TableCell>{order.paymentState}</TableCell>
						<TableCell>
							<Button size="small" variant="outlined" color="primary">
								{order.takeToWork}
							</Button>
						</TableCell>
					</TableRow>
				))
			}
		</TableBody>
	);
};

export default TableOrderRow;

