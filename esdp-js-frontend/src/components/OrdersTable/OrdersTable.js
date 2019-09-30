import {TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React, {Component} from "react";
import config from '../../config'
import {withRouter} from "react-router";
import AdminControls from "./AdminControls";
import MasterControls from "./MasterControls";
import Tooltip from "@material-ui/core/Tooltip";

class OrdersTable extends Component {

  state = {
    message: '',
    author: null,
    isPrivateMessage: false,
  };
  timeout = null;

  start = (token) => {
    this.websocket = new WebSocket(`${config.wsURL}/?token=${token}`);

    this.websocket.onmessage = (message) => {
      const decodedMessage = JSON.parse(message.data);

      switch (decodedMessage.type) {
        case 'UPDATED_ORDERS_FROM_SERVER':
          this.props.getOrders();
          console.log('UPDATED_ORDERS_FROM_SERVER');
          break;
        case 'ERROR':
          console.log(decodedMessage.message);
          break;
        default:
          return {error: 'Unknown message type'}
      }
    };

    this.websocket.onopen = () => {
      clearTimeout(this.timeout);
      console.log('connected');
    };

    this.websocket.onclose = (event) => {
      console.log('connection lost', event.reason);
      console.log('timeout', this.timeout);
      if (this.timeout !== 'unmounted') {
        this.timeout = setTimeout(() => this.start(token), 3000);
      }
    };

    this.websocket.onerror = (err) => {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      this.websocket.close();
    };
  };

  componentDidMount() {
    if (!this.props.user) {

      this.props.history.push('/login')
    } else {
        const token = this.props.user.token;
        console.log('start');
        this.start(token);
      }
  };

  componentWillUnmount() {
    this.timeout = 'unmounted';
    this.websocket && this.websocket.close();
    console.log('stop');
  };

  handleChange = (event, id) => {
    const _tempOrders = [...this.props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index][event.target.name] = event.target.value;
    this.props.updateOrders(_tempOrders);
    const key = event.target.name;
    const value = _tempOrders[index][event.target.name];
    this.props.putUpdateOrder(id, {[key]: value});
  };
  handleCheck = (event, id) => {
    const _tempOrders = [...this.props.orders];
    const index = _tempOrders.findIndex(order => {return order.id === id});
    _tempOrders[index][event.target.name] = event.target.checked;
    this.props.updateOrders(_tempOrders);
    this.props.putUpdateOrder(id, {[event.target.name]: event.target.checked});
  };
  handleClick = (id, newStatusId) => {
    this.props.putUpdateOrder(id, {statusId: newStatusId})
      .then(() => {
        console.log('readyState',this.websocket.readyState);
        let message = JSON.stringify({
          type: 'STATUS_CHANGED'
        });
        this.websocket.send(message);
        this.setState({message: ''});
      });
  };

  render() {
    const { history } = this.props;

    return (
        <TableBody >
          {this.props.orders ?
            this.props.orders.map((order, index) => (
                <TableRow
                    hover
                    id={`tableRow${index}`}
                    key={index}
                    onClick={() => history.push(`order/${order.id}`)}
                >
                  <Tooltip title={order.id} placement="top-start">
                    <TableCell style={{maxWidth: '75px'}}>
                      {order.id.substring(0, 8)}
                    </TableCell>
                  </Tooltip>
                  {this.props.user ?
                      this.props.user.role === 'admin' ?
                          <AdminControls order={order}
                                         index={index}
                                         handleChange={this.handleChange}
                                         handleCheck={this.handleCheck}
                                         {...this.props}/>
                          :   <MasterControls order={order}
                                              index={index}
                                              statuses={this.props.statuses}
                                              getOrders={this.props.getOrders}
                                              handleClick={this.handleClick}
                                              loading={this.props.loading}
                                              {...this.props}/>
                      : null
                  }
                </TableRow>
            )) : null
          }
        </TableBody>

    )
  }
}

export default withRouter(OrdersTable);

