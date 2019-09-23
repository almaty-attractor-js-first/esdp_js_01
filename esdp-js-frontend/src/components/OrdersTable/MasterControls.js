import React, {Fragment} from "react";
import {Button, TableCell} from "@material-ui/core";
import moment from "moment";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    button: {
        backgroundColor: props => props.asd,
    },
});
const MasterControls = props => {
    const { order, index } = props;
    const classes = useStyles();



    const getStatusButton = statusId => {
        let currentStatus;

        if (props.statuses.length) {
            currentStatus = props.statuses.find(status => {
                return statusId === status.id;
            });
        }
        let text;
        let newStatus;
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
                return <p>'Ошибка обработки статуса'</p>;
        }
        return <Button style={{backgroundColor: currentStatus.color}} onClick={e => {
            e.stopPropagation();
            props.handleClick(e, order.id, newStatus);
        }}>{text}</Button>;
    };

    return (
        <Fragment>
            <TableCell>{order.clientId}</TableCell>
            <TableCell>
                {moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
            </TableCell>
            <TableCell align='center'>
                {props.statuses.length ?
                    getStatusButton(order.statusId)
                : null}
            </TableCell>
        </Fragment>
    );
};

export default MasterControls;