import {TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React from "react";
import {withRouter} from "react-router";
import AdminControls from "./AdminControls";
import MasterControls from "./MasterControls";


const TableOrderRow = (props) => {
  const { history } = props;

  const handleChange = (event, id) => {
    const _tempOrders = [...props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index][event.target.name] = event.target.value;
    props.updateOrders(_tempOrders);
    const key = event.target.name;
    const value = _tempOrders[index][event.target.name];
    props.putUpdateOrder(id, {[key]: value});
  };

  const handleCheck = (event, id) => {
    const _tempOrders = [...props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index][event.target.name] = event.target.checked;
    props.updateOrders(_tempOrders);
    props.putUpdateOrder(id, {[event.target.name]: event.target.checked});
  };

  const handleClick = (event, id, newStatusId) => {
    const _tempOrders = [...props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index].statusId = newStatusId;
    props.updateOrders(_tempOrders);
    props.putUpdateOrder(id, {statusId: newStatusId});
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
                  <AdminControls order={order}
                                 index={index}
                                 handleChange={handleChange}
                                 handleCheck={handleCheck}
                                 {...props}/>
              :   <MasterControls order={order}
                                  index={index}
                                  statuses={props.statuses}
                                  getOrders={props.getOrders}
                                  handleClick={handleClick}
                                  loading={props.loading}
                                  {...props}/>
              : null
            }
          </TableRow>
        ))
      }
    </TableBody>
  );
};

export default withRouter(TableOrderRow);

