import {Button, TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import moment from "moment";
import FormHelperText from '@material-ui/core/FormHelperText';



const TableOrderRow = (props) => {
	return (
		<TableBody >
			{
				props.orders.map((order, index) => (
					<TableRow
						hover
						key={index}
						onClick={() => props.click(order.id)}
					>
						<TableCell>
              {order.id}
              <FormHelperText>{moment(order.createdAt).format('DD.MM.YYYY HH:mm')}</FormHelperText>
						</TableCell>
						<TableCell>{order.masterId}</TableCell>
						<TableCell>{order.firstName} {order.lastName}</TableCell>
						<TableCell>

						</TableCell>
						<TableCell>{order.deliveryType}</TableCell>
						<TableCell>{order.paymentStatus}</TableCell>
						<TableCell>
							<Button size="small" variant="outlined" color="primary">
								Взять в работу
							</Button>
						</TableCell>
					</TableRow>
				))
			}
		</TableBody>
	);
};

export default TableOrderRow;

