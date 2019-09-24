import React, {Fragment} from "react";
import {Button, TableCell} from "@material-ui/core";
import moment from "moment";

const DynamicStatusButton = ({statusId, order, ...props}) => {

    let currentStatus;
    let newStatus;
    let text;

    if (props.statuses.length) {
        currentStatus = props.statuses.find(status => {
            return statusId === status.id;
        });
    }
    switch (currentStatus.name) {
        case 'new':
            text = 'Взять в работу';
            newStatus = 'taken';
            break;
        case 'taken':
            text = 'Сдать на склад';
            newStatus = 'pending';
            break;
        case 'pending':
            text = 'Взять в работу';
            newStatus = 'inWork';
            break;
        case 'inWork':
            text = 'Завершить работу';
            newStatus = 'done';
            break;
        case 'done':
            text = 'Взять в доставку';
            newStatus = 'delivering';
            break;
        default:
            return <p>Ошибка обработки статуса...</p>;
    }

    let newStatusId;
    if (props.statuses.length) {
        newStatusId = props.statuses.find(status => {
            return newStatus === status.name;
        }).id;
    }
    return <Button style={{backgroundColor: currentStatus.color, whiteSpace: 'nowrap'}}
                   disabled={props.loading}
                   onClick={e => {
                       e.stopPropagation();
                       setTimeout(() => {
                           props.getOrders();
                       }, 500);
                       props.handleClick(e, order.id, newStatusId);

                   }}>{text}</Button>;
};











const MasterControls = props => {
    const { order } = props;
    return (
        <Fragment>
            <TableCell>{order.clientId}</TableCell>
            <TableCell>
                {moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
            </TableCell>
            <TableCell align='center'>
                {props.statuses.length ?
                    <DynamicStatusButton order={order} statusId={order.statusId} {...props}/>
                : null}
            </TableCell>
        </Fragment>
    );
};

export default MasterControls;