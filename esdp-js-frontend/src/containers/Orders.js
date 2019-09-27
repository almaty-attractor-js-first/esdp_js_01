import React, {Fragment, useEffect} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getOrders, putUpdateOrder, updateOrders} from "../store/actions/ordersActions";
import {getStatuses} from "../store/actions/statusesActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableCell,
  TableHead,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TableRow from "@material-ui/core/TableRow";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import {getWorkers} from "../store/actions/workersActions";
import {fetchConnectedUsers, loggedIn, loggedOut} from "../store/actions/usersActions";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    minWidth: "125px"
  },
  master: {
    minWidth: "125px"
  },
  client: {
    minWidth: "125px"
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Orders = props => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
  }, [props.statuses]);


  useEffect(() => {
    props.getStatuses();
  }, []);

  useEffect(() => {
    console.time('didMountOrders');
    props.getOrders();
    console.timeEnd('didMountOrders');
  }, []);

  useEffect(() => {
    props.getWorkers();
  }, []);

  useEffect(() => {
    setOrders(props.orders);
  }, [props.orders]);

  const {
    className,
    loading,
    getOrders,
    getWorkers,
    getStatuses,
    updateOrders,
    putUpdateOrder,
    staticContext,
    onLoggedIn,
    onLoggedOut,
    onFetchConnectedUsers,
    ...rest
  } = props;
  const classes = useStyles();




  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={props.user?
          props.user.role === 'admin' ?
            <Button component={RouterLink} to="/new-order" color="primary" size="small" variant="outlined">
              Добавить заказ
            </Button>
         : null
        : null
        }
        title="Список заказов"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <Box className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {props.user ?
                      props.user.role === 'admin' ?
                      <Fragment>
                        <TableCell>ID заказа</TableCell>
                        <TableCell sortDirection="desc">
                          <Tooltip
                              enterDelay={300}
                              title="Sort"
                          >
                            <TableSortLabel
                                active
                                direction="desc"
                            >
                              Дата заказа
                            </TableSortLabel>
                          </Tooltip>
                        </TableCell>
                        <TableCell>Тип доставки</TableCell>
                        <TableCell>Статус оплаты</TableCell>
                        <TableCell>Мастер</TableCell>
                        <TableCell>Курьер</TableCell>
                        <TableCell>Статус заказа</TableCell>
                      </Fragment>
                    :
                      <Fragment>
                        <TableCell>ID заказа</TableCell>
                        <TableCell>Имя клиента</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell align='center'>Статус заказа</TableCell>
                      </Fragment>
                  : null}
                </TableRow>
              </TableHead>
              <OrdersTable
                loading={loading}
                orders={orders}
                user={props.user}
                workers={props.workers}
                statuses={props.statuses}
                classes={classes}
                updateOrders={props.updateOrders}
                putUpdateOrder={props.putUpdateOrder}
                getOrders={props.getOrders}
                onLoggedIn={props.onLoggedIn}
                onLoggedOut={props.onLoggedOut}
                onFetchConnectedUsers={props.onFetchConnectedUsers}
              />
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Показать все
          <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Orders.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    loading: state.orders.loading,
    user: state.users.user,
    orders: state.orders.orders,
    workers: state.workersReducer.workers,
    statuses: state.statusesReducer.statuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getWorkers: () => dispatch(getWorkers()),
    getStatuses: () => dispatch(getStatuses()),
    updateOrders: (order) => dispatch(updateOrders(order)),
    putUpdateOrder: (id, order) => dispatch(putUpdateOrder(id, order)),
    onLoggedIn: (user) => dispatch(loggedIn(user)),
    onLoggedOut: (users) => dispatch(loggedOut(users)),
    onFetchConnectedUsers: users => dispatch(fetchConnectedUsers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
