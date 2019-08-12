import {Button, TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React, {useEffect} from "react";
import moment from "moment";
import FormHelperText from '@material-ui/core/FormHelperText';
import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {getStatuses, updateCurrentOrder} from "../../store/actions/ordersActions";

const TableOrderRow = (props) => {
  const { history } = props;

  useEffect(() => {
    props.getStatuses();
  }, []);

  const [value, setValue] = React.useState();
  const handleChangeStatus = name => event => {
    setValue({ ...value, [name]: event.target.value });
    console.log(value)
  };

  return (
    <TableBody >
      {
        props.orders.map((order, index) => (
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

                  value={value}
                  onChange={handleChangeStatus}
                  SelectProps={{
                    native: true,
                  }}
                  margin="normal"
                >
                  {props.statuses.map(status => (
                    <option key={status.name} value={status.name}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableOrderRow));

