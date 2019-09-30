import React, {Fragment} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from "moment";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";

export default function ClientRow(props) {
    return (
        <Fragment>
            {props.clients.map(client => (
                <TableRow key={client.id} hover>
                    <TableCell align="right">{client.id.substring(0, 7)}</TableCell>
                    <TableCell component="th" scope="row">
                        <Link component={RouterLink} to={`/clients/${client.id}`}>
                            {`${client.firstName} ${client.lastName}`}
                        </Link>
                    </TableCell>
                    <TableCell align="right">{client.email}</TableCell>
                    <TableCell align="right">{`+${client.phone}`}</TableCell>
                    <TableCell align="right">{client.address}</TableCell>
                    <TableCell align="right">
                        <Link component={RouterLink} to={`/orders/`}>
                            {'Список заказов'}
                        </Link>
                    </TableCell>
                    <TableCell align="right">{moment(client.createdAt).format('DD.MM.YYYY HH:mm')}</TableCell>
                </TableRow>
                )
            )}
        </Fragment>
    );
}