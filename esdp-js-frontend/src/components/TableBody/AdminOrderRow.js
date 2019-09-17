import {TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import moment from "moment";
import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";

const TableOrderRow = (props) => {
  const { history } = props;

  const handleChange = (event, id) => {
    const _tempOrders = [...props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index][event.target.name] = event.target.value;
    props.updateOrders(_tempOrders);
    props.putUpdateOrder(id, _tempOrders[index]);
  };
  console.log(props);
  return (
    <TableBody >
      {
        props.orders.map((order, index) => (
          <TableRow
            hover
            id={`tableRow${index}`}
            key={index}
            onClick={() => history.push(`order/${order.id}`)}
          >
            <TableCell>
              {order.id}
            </TableCell>
            <TableCell>
              <TextField
                className={props.classes.master}
                select
                data-id={index}
                fullWidth
                value={order.masterId || ''}
                onClick={(e) => e.stopPropagation()}
                inputProps={{
                  name: 'master',
                  id: 'master' + index,
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>
                  Выбрать мастера
                </option>
                {props.workers ?
                  props.workers.map((item, index) => {
                    console.log(item.id);
                    return (
                      <option key={index} value={item.id}>
                        {`${item.firstName} ${item.lastName}`}
                      </option>
                    )
                  }) : null}
              </TextField>
            </TableCell>
            <TableCell id={`tableCellName${index}`}
                       className={props.classes.client}>
              {order.firstName} {order.lastName}
            </TableCell>
            <TableCell>
              {moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
            </TableCell>
            <TableCell>{order.deliveryType === 'self' ? 'Самовывоз' : 'Доставка'}</TableCell>
            <TableCell>{order.paymentStatus ? 'Оплачен' : 'Не оплачен'}</TableCell>
            <TableCell className={props.classes.statusContainer}>
              <TextField
                select
                data-id={index}
                fullWidth
                value={order.status}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {handleChange(e, order.id);}}
                inputProps={{
                  name: 'status',
                  id: 'status' + index,
                }}
                SelectProps={{
                  native: true,
                }}
              >
                {props.statuses ?
                  props.statuses.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.title}
                      </option>
                    )
                  }) : null}
              </TextField>
            </TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  );
};

export default withRouter(TableOrderRow);

