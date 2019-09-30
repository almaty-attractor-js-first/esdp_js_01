import React, {Fragment} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from "moment";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";

export default function ClientRow(props) {
    const translateRole = (role) => {
        switch (role) {
            case 'admin':
                return 'Администратор';
            case 'master':
                return 'Мастер';
            case 'courier':
                return 'Курьер';
        }
    };
    return (
        <Fragment>
            {props.workers
                .filter(worker => worker.role !== 'nobody')
                .map(worker => (
                    <TableRow key={worker.id} hover>
                        <TableCell align="right">{worker.id.substring(0, 7)}</TableCell>
                        <TableCell component="th" scope="row">
                            <Link component={RouterLink} to={`/workers/${worker.id}`}>
                                {`${worker.firstName} ${worker.lastName}`}
                            </Link>
                        </TableCell>
                        <TableCell align="right">{worker.email}</TableCell>
                        <TableCell align="right">{`+${worker.phone}`}</TableCell>
                        <TableCell align="right">{translateRole(worker.role)}</TableCell>
                        <TableCell align="right">
                            <Link component={RouterLink} to={`/orders/`}>
                                {'Список заказов'}
                            </Link>
                        </TableCell>
                        <TableCell align="right">{moment(worker.createdAt).format('DD.MM.YYYY HH:mm')}</TableCell>
                    </TableRow>
                )
            )}
        </Fragment>
    );
}