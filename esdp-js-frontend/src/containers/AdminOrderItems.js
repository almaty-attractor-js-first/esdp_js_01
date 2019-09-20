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
import AdminOrderRow from "../components/OrdersTable/AdminOrderRow";
import {getWorkers} from "../store/actions/workersActions";


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

const OrderItems = props => {
  useEffect(() => {
    props.getOrders();
  }, []);

  useEffect(() => {
    props.getStatuses();
  }, []);

  useEffect(() => {
    props.getWorkers();
  }, []);

  const { className, getOrders, getWorkers, getStatuses, updateOrders, putUpdateOrder, staticContext, ...rest } = props;
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
          <div className={classes.inner}>
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
              <AdminOrderRow
                orders={props.orders}
                user={props.user}
                workers={props.workers}
                statuses={props.statuses}
                classes={classes}
                updateOrders={props.updateOrders}
                putUpdateOrder={props.putUpdateOrder}
              />
            </Table>
          </div>
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

OrderItems.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
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
    putUpdateOrder: (id, order) => dispatch(putUpdateOrder(id, order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);
