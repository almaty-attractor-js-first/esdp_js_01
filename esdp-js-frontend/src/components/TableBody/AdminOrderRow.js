import {Button, TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React, {useEffect, useRef} from "react";
import moment from "moment";
import FormHelperText from '@material-ui/core/FormHelperText';
import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {getStatuses, updateOrderStatus} from "../../store/actions/ordersActions";

const TableOrderRow = (props) => {
  const { history } = props;
  const [value, setValue] = React.useState();
  const [id, setId] = React.useState('');
  const [orders, setOrders] = React.useState(props.orders);

  const handleChangeStatus =  async (event) => {
    await setValue({[event.target.name]: event.target.value });
  };

  useEffect(() => {
    setOrders(props.orders);
    console.log(orders);
    console.log(value);
  }, [props.orders]);

  useEffect(() => {
    props.getStatuses();
  }, []);


  useEffect(() => {
    if (value) {
      console.log(value);
      props.updateOrderStatus(id, value)
    }
  }, [value]);

  return (
    <TableBody >
      {
        orders.map((order, index) => (
          <TableRow
            hover
            key={index}
            onClick={() => history.push(`order/${order.id}`)}
          >
            <TableCell>
              {order.id}
              <FormHelperText>{moment(order.createdAt).format('DD.MM.YYYY HH:mm')}</FormHelperText>
            </TableCell>
            <TableCell>{order.masterId}</TableCell>
            <TableCell>{order.firstName} {order.lastName}</TableCell>
            <TableCell>
              {moment(order.createdAt).format('DD.MM.YYYY HH:mm')}
            </TableCell>
            <TableCell>{order.deliveryType === 'self' ? 'Самовывоз' : 'Доставка'}</TableCell>
            <TableCell>{order.paymentStatus ? 'Оплачен' : 'Не оплачен'}</TableCell>
            <TableCell>
              <FormControl>
                <TextField
                  select
                  // helperText="Изменить статус"
                  name={order.id}
                  value={order.status}
                  onChange={(e) => {handleChangeStatus(e); setId(order.id)}}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  margin="normal"
                >
                  {props.statuses.map((status, index) => (
                    <option key={index} value={status.name}>
                      {status.title}
                    </option>
                  ))}
                </TextField>
              </FormControl>
            </TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  );
};

const mapStateToProps = state => {
  return {
    statuses: state.orders.statuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatuses: () => dispatch(getStatuses()),
    updateOrderStatus: (id, status) => dispatch(updateOrderStatus(id, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableOrderRow));

