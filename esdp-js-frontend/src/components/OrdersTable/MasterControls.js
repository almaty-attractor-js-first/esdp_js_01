import React, {Fragment} from "react";
import {TableCell} from "@material-ui/core";
import moment from "moment";
import DynamicStatusButton from "./DynamicStatusButton";


    let currentStatus;
    let newStatus;
    let text;

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