import React, {Fragment} from "react";
import {Button, TableCell} from "@material-ui/core";
import moment from "moment";


const MasterControls = props => {
    const { order, index } = props;
    return (
        <Fragment>
            <TableCell>{order.firstName} {order.lastName}</TableCell>
            <TableCell>
                {moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
            </TableCell>
            <TableCell align='center'>
                <Button
                    onClick={(e) => e.stopPropagation()}
                    size="small"
                    id={`masterButton${index}`}
                    fullWidth
                >
                    {(props.statuses.find(status => {
                        return order.statusId === status.id
                    })) ?
                        (props.statuses.find(status => {
                            return order.statusId === status.id
                        }).title) :
                        '' /**@TODO Переделать проверку на айдишку и выводить названия кнопок в зависимости от роли*/
                    }
                </Button>
            </TableCell>
        </Fragment>
    );
};

export default MasterControls;