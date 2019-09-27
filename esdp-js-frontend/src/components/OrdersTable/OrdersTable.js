import {TableBody, TableCell} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import React, {Component} from "react";
import {withRouter} from "react-router";
import AdminControls from "./AdminControls";
import MasterControls from "./MasterControls";
import Tooltip from "@material-ui/core/Tooltip";
import {CONNECTED_USERS, USER_LOGGED_IN, USER_LOGGED_OUT, WS_TEST_SERVER} from "../../store/actions/actionTypes";

class OrdersTable extends Component {

  state = {
    message: '',
    author: null,
    isPrivateMessage: false
  };

  componentWillUnmount() {
    this.websocket && this.websocket.close();
  };

  start = (token) => {
    this.websocket = new WebSocket(`ws://localhost:8000/?token=${token}`);

    this.websocket.onmessage = (message) => {
      const decodedMessage = JSON.parse(message.data);

      switch (decodedMessage.type) {
        case WS_TEST_SERVER:
          this.props.getOrders();
          console.log(decodedMessage.message);
          break;
        case USER_LOGGED_IN:
          this.props.onLoggedIn(decodedMessage.user);
          break;
        case USER_LOGGED_OUT:
          this.props.onLoggedOut(decodedMessage.connectedUsers);
          break;
        case CONNECTED_USERS:
          this.props.onFetchConnectedUsers(decodedMessage.connectedUsers);
          break;
        default:
          return {error: 'Unknown message type'}
      }
    };

    this.websocket.onopen = () => {
      console.log('connected');
    };

    this.websocket.onclose = () => {
      console.log('connection lost');
      setTimeout(() => {this.start(token)}, 5000);

    }
  };

  componentDidMount() {
      if (!this.props.user) {
        this.props.history.push('/login')
      } else {
        const token = this.props.user.token;

        this.start(token);
      }
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
    this.props.putUpdateOrder(id, {statusId: newStatusId});
    let message = JSON.stringify({
      type: 'WS_TEST_CLIENT',
      message: 'TESTING...'
    });

    this.websocket.send(message);
    this.setState({message: ''});
    //@TODO Повесить на промис
  };

  render() {
    const { history } = this.props;

    return (
        <TableBody >
          {
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
            ))
          }
        </TableBody>

    )
  }
}

export default withRouter(OrdersTable);

