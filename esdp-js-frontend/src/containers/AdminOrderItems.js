import React, {useEffect} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getOrders, getStatuses, putUpdateOrder, updateOrders} from "../store/actions/ordersActions";
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
import AdminOrderRow from "../components/TableBody/AdminOrderRow";


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
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

  const { className, getOrders, getStatuses, updateOrders, putUpdateOrder, staticContext, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button component={RouterLink} to="/new-order" color="primary" size="small" variant="outlined">
            Добавить заказ
          </Button>
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
                  <TableCell>ID заказа</TableCell>
                  <TableCell>Имя мастера</TableCell>
                  <TableCell>Имя клиента</TableCell>
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
                  <TableCell>Статус заказа</TableCell>
                </TableRow>
              </TableHead>
              <AdminOrderRow
                orders={props.orders}
                statuses={props.statuses}
                statusContainer={classes.statusContainer}
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
    orders: state.orders.orders,
    statuses: state.orders.statuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getStatuses: () => dispatch(getStatuses()),
    updateOrders: (order) => dispatch(updateOrders(order)),
    putUpdateOrder: (id, order) => dispatch(putUpdateOrder(id, order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);
