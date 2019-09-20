import {TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import {withRouter} from "react-router";
import AdminFields from "../OrderDetails/AdminControls";
import MasterControls from "../OrderDetails/MasterControls";


const TableOrderRow = (props) => {
  const { history } = props;

  const handleChange = (event, id) => {
    const _tempOrders = [...props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index][event.target.name] = event.target.value;
    props.updateOrders(_tempOrders);
    props.putUpdateOrder(id, _tempOrders[index]);
  };
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
            <TableCell style={{maxWidth: '75px'}}>
              {order.id}
            </TableCell>
            {props.user ?
              props.user.role === 'admin' ?
                  <AdminFields order={order} index={index} handleChange={handleChange} {...props}/>
              :   <MasterControls order={order} index={index} statuses={props.statuses} {...props}/>
              : null
            }
          </TableRow>
        ))
      }
    </TableBody>
  );
};

export default withRouter(TableOrderRow);

