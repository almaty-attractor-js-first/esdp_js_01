import React, {Fragment} from "react";
import {TableCell} from "@material-ui/core";
import WorkersSelect from "./WorkersSelect";
import StatusesSelect from "./StatusesSelect";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";

const AdminFields = props => {
    const { order, index, handleChange } = props;
    return (
        <Fragment>
            <TableCell style={{maxWidth: '75px'}}>
                {moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
            </TableCell>
            <TableCell style={{maxWidth: '50px'}}>{order.deliveryType === 'self' ? 'Самовывоз' : 'Доставка'}</TableCell>
            <TableCell style={{maxWidth: '50px'}}>
                <Checkbox
                    checked={order.paymentStatus}
                    onClick={(e) => e.stopPropagation()}
                    value={order.paymentStatus ? 'Оплачен' : 'Не оплачен'}
                    inputProps={{
                        'aria-label': 'primary checkbox',
                    }} />
            </TableCell>
            <TableCell>
                <WorkersSelect
                    workerId={order.masterId}
                    index={index}
                    workers={props.workers}
                    name='master'
                    onClick={(e) => e.stopPropagation()}
                    changeHandler={(e) => {handleChange(e, order.id);}}

                />
            </TableCell>
            <TableCell>
                <WorkersSelect
                    workerId={order.courierId}
                    index={index}
                    workers={props.workers}
                    name='courier'
                    onClick={(e) => e.stopPropagation()}
                    changeHandler={(e) => {handleChange(e, order.id);}}

                />
            </TableCell>
            <TableCell>
                <StatusesSelect
                    index={index}
                    statusId={order.statusId}
                    name='status'
                    onClick={(e) => e.stopPropagation()}
                    changeHandler={(e) => {handleChange(e, order.id);}}
                    statuses={props.statuses}
                />
            </TableCell>
        </Fragment>
    );
};

export default AdminFields;

