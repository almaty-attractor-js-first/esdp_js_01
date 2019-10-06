import React from "react";
import {Button} from "@material-ui/core";

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
        case 'delivering':
            text = 'Завершить заказ';
            newStatus = 'closed';
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
                   size='small'
                   disabled={props.loading}
                   onClick={e => {
                       e.stopPropagation();
                       props.handleClick(order.id, newStatusId);

                   }}>{text}</Button>;
};

export default DynamicStatusButton;