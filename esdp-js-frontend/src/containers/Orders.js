import React, {Fragment, useEffect} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getOrders, getTotalOrders, putUpdateOrder, updateOrders} from "../store/actions/ordersActions";
import {getStatuses} from "../store/actions/statusesActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableCell,
  TableHead,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';
import TableRow from "@material-ui/core/TableRow";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import {getWorkers} from "../store/actions/workersActions";
import Box from "@material-ui/core/Box";
import TablePagination from "@material-ui/core/TablePagination";


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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.getOrders(rowsPerPage, newPage + 1);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+ event.target.value);
    setPage(0);
    props.getOrders(event.target.value, page);
  };

  React.useEffect(() => {
  }, [props.statuses]);

  useEffect(() => {
    props.getStatuses();
  }, []);

  useEffect(() => {
    props.getOrders();
    props.getTotalOrdersCount();
  }, []);

  useEffect(() => {
    props.getWorkers();
  }, []);


  const {
    className,
    loading,
    getOrders,
    getWorkers,
    getStatuses,
    updateOrders,
    putUpdateOrder,
    staticContext,
    totalOrdersCount,
    getTotalOrdersCount,
    clientOrders,
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
                orders={props.id ? props.clientOrders : props.orders}
                user={props.user}
                users={props.users}
                workers={props.workers}
                statuses={props.statuses}
                classes={classes}
                rowsPerPage={rowsPerPage}
                page={page}
                updateOrders={props.updateOrders}
                putUpdateOrder={props.putUpdateOrder}
                getOrders={props.getOrders}
              />
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.totalOrdersCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
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
    users: state.users.users,
    orders: state.orders.orders,
    totalOrdersCount: state.orders.totalOrdersCount,
    workers: state.workersReducer.workers,
    statuses: state.statusesReducer.statuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: (perPage, page) => dispatch(getOrders(perPage, page)),
    getTotalOrdersCount: () => dispatch(getTotalOrders()),
    getWorkers: () => dispatch(getWorkers()),
    getStatuses: () => dispatch(getStatuses()),
    updateOrders: (order) => dispatch(updateOrders(order)),
    putUpdateOrder: (id, order) => dispatch(putUpdateOrder(id, order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
