import React, {Fragment, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  getOrderItems,
  putUpdateOrder, setChangedOrderItems,
  setOrderItems,
  updateCurrentOrder,
  updateCurrentOrderItems
} from "../../store/actions/ordersActions";
import {getStatuses} from "../../store/actions/statusesActions";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import TableBody from "@material-ui/core/TableBody";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableCell,
  TableRow
} from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PerfectScrollbar from "react-perfect-scrollbar";
import CardActions from "@material-ui/core/CardActions";
import StatusesSelect from "../OrdersTable/StatusesSelect";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/PlusOne';
import {getCleaningItems} from "../../store/actions/newOrderActions";
import * as uuid from "uuid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 550
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: "90px"
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 140,
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    }
  },
  bottomIcon: {
    marginTop: theme.spacing(3),
  },
  select: {
    marginTop: theme.spacing(2),
    '&:disabled': {
      color: '#000'
    }
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0
  },
  margin: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  cardTitle: {
    margin: theme.spacing(1),
  },
}));

const OrderItems = props => {
  const classes = useStyles();
  const [isChanged, setIsChanged] = React.useState(false);

  useEffect(() => {
    props.getCleaningItems();
    return () => {
    }
  }, []);

  useEffect(() => {
    props.updateCurrentOrder(props.match.params.id);
    return () => {
      props.updateCurrentOrder({});
    }
  }, []);

  useEffect(() => {
    props.getOrderItems(props.match.params.id);
    return () => {
      props.setOrderItems([]);
    }
  }, []);

  useEffect(() => {
    props.getStatuses();
  }, []);

  const updateCurrentOrderItems = (id, items) => {
    props.updateCurrentOrderItems(id, items);
    setIsChanged(false);
    const JSONString = JSON.stringify(items);
    props.setChangedOrderItems(JSONString);
    console.log(isChanged);
  };

  const handleChange = (event, id) => {
    const currentOrder = {...props.currentOrder};
    currentOrder[event.target.name] = event.target.value;
    const key = event.target.name;
    const value = currentOrder[event.target.name];
    props.putUpdateOrder(id, {[key]: value})
        .then(() => {
          props.updateCurrentOrder(props.match.params.id);
    });
  };

  const handleOrderItemsChange = (event) => {
    const _tempOrderItems = [...props.currentOrderItems];
    _tempOrderItems[event.target.dataset.id][event.target.name] = event.target.value;
    const orderItem = props.cleaningItems.find(item => {
      return item.name === _tempOrderItems[event.target.dataset.id].cleaningType
    });
    if (orderItem) {
      _tempOrderItems[event.target.dataset.id].orderId = props.currentOrder.id;
      _tempOrderItems[event.target.dataset.id].id = uuid.v4();
      _tempOrderItems[event.target.dataset.id].price = orderItem.price;
      _tempOrderItems[event.target.dataset.id].title = orderItem.title;
    }
    props.setOrderItems(_tempOrderItems);
    const newOrderItems = JSON.stringify(_tempOrderItems);
    setIsChanged(props.changedOrderItems !== newOrderItems);
  };

  const addNewOrderItem= () => {
    const newItem = { cleaningType: '', qty: 1, price: null, id: uuid.v4()};
    const _tempOrderItems = [...props.currentOrderItems];
    _tempOrderItems.push(newItem);
    props.setOrderItems(_tempOrderItems);
    const newOrderItems = JSON.stringify(_tempOrderItems);
    setIsChanged(props.changedOrderItems !== newOrderItems);
  };

  const removeOrderItem = (i) => {
    const _tempOrderItems = [...props.currentOrderItems];
    _tempOrderItems.splice(i, 1);
    props.setOrderItems(_tempOrderItems);
    const newOrderItems = JSON.stringify(_tempOrderItems);
    setIsChanged(props.changedOrderItems !== newOrderItems);
  };

  const handleDiscardChanges = () => {
    const prevItems = JSON.parse(props.changedOrderItems);
    props.setOrderItems(prevItems);
    setIsChanged(false);
  };

  return (
    <div>
      {props.currentOrder && props.currentOrderItems ?
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Информация о заказе"/>
              <Divider className={classes.divider} />
              <CardContent className={classes.content}>
                <PerfectScrollbar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">ID заказа</TableCell>
                      <TableCell align="left">
                        {props.currentOrder.id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Клиент</TableCell>
                      <TableCell align="left">
                        <div>
                          {props.user && props.user.role === 'admin' ?
                              <Link component={RouterLink} to={`/clients/${props.currentOrder.clientId}`}>
                                {`${props.currentOrder.client_name} ${props.currentOrder.client_lastname}` || 'Информация отсутствует'}
                              </Link>
                          : `${props.currentOrder.client_name} ${props.currentOrder.client_lastname}` || 'Информация отсутствует'}
                        </div>
                        <span>{props.currentOrder.phone}</span>
                        <div>{props.currentOrder.address}</div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Мастер</TableCell>
                      <TableCell align="left">
                        {`${props.currentOrder.master_name} ${props.currentOrder.master_lastname}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Курьер</TableCell>
                      <TableCell align="left">
                        {`${props.currentOrder.courier_name} ${props.currentOrder.courier_lastname}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Дата заказа</TableCell>
                      <TableCell align="left">
                        {
                          moment(props.currentOrder.createdAt).format('DD.MM.YYYY HH:mm')
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Сумма заказа</TableCell>
                      <TableCell align="left">
                        <b>{props.currentOrder.totalPrice}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Статус заказа</TableCell>
                      <TableCell align="left">
                        <StatusesSelect
                            disabled={(props.user && (props.user.role === 'admin'))}
                            statusId={props.currentOrder.statusId}
                            name='statusId'
                            changeHandler={(e) => {handleChange(e, props.currentOrder.id);}}
                            statuses={props.statuses}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </PerfectScrollbar>
              </CardContent>
              <CardActions>

              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Typography variant={"h5"} className={classes.cardTitle}>
                    Позиции заказа
                  </Typography>}
                action={
                  <div>
                    {isChanged ?
                      <Fragment>
                        <Button variant="contained"
                                size="small"
                                color="secondary"
                                className={classes.margin}
                                onClick={handleDiscardChanges}>
                          Отменить
                        </Button>
                        <Button variant="contained"
                                size="small"
                                color="primary"
                                className={classes.margin}
                                onClick={() => updateCurrentOrderItems(props.match.params.id, props.currentOrderItems)}>
                          Сохранить
                        </Button>
                      </Fragment>
                    : null}
                    {!props.currentOrderItems.length ?
                        <Fragment>
                          <Button variant="contained"
                                  size="small"
                                  color="primary"
                                  className={classes.margin}
                                  onClick={addNewOrderItem}>
                            Добавить
                          </Button>
                        </Fragment>
                        : null}
                  </div>
                }
              />

              <Divider className={classes.divider} />
              <CardContent>
                <Grid container spacing={3}>
                  <Fragment>
                  {props.currentOrderItems.map((item, index) => (
                      <Fragment key={index}>
                        <Grid item xs={6} sm={6} style={{padding: '0 12px'}}>
                          <TextField
                              disabled={!(props.user && (props.user.role === 'admin'))}
                              select
                              className={classes.select}
                              data-id={index}
                              fullWidth
                              value={item.cleaningType}
                              onChange={handleOrderItemsChange}
                              inputProps={{
                                name: 'cleaningType',
                                id: 'cleaningType' + index,
                                'data-id': index
                              }}
                              SelectProps={{
                                native: true,
                              }}
                              helperText="Тип чистки"
                          >
                            <option value="" disabled>
                              Не выбран
                            </option>
                            {props.cleaningItems ?
                                props.cleaningItems.map((item, index) => {
                                  return (
                                      <option key={index} value={item.name}>
                                        {item.title}
                                      </option>
                                  )
                                }) : null}
                          </TextField>
                        </Grid>
                        <Grid item xs={3} style={{padding: '0 12px'}}>
                          {props.currentOrderItems[index].cleaningType &&
                            <TextField
                                disabled={!((props.user) && (props.user.role === 'admin'))}
                                className={classes.select}
                                data-id={index}
                                onChange={handleOrderItemsChange}
                                type="number"
                                inputProps={{
                                  min: "1", max: "10", step: "1",
                                  id: 'cleaningQty' + index,
                                  'data-id': index,
                                  'name': 'qty'
                                }}
                                value={item.qty}
                                required
                                id="qty"
                                name="qty"
                                helperText="Сколько пар?"
                                fullWidth
                            />
                          }
                        </Grid>
                        <Grid item xs={1} style={{padding: '0 12px'}}>
                          <IconButton
                              disabled={!((props.user) && (props.user.role === 'admin'))}
                             data-delete-id={index}
                             size="small"
                             className={classes.bottomIcon}
                             color="secondary"
                             onClick={() => removeOrderItem(index, item.id)}>
                            <DeleteIcon fontSize="small"/>
                          </IconButton>
                        </Grid>
                        <Grid item xs={1} style={{padding: '0 12px'}}>
                          <IconButton
                              disabled={!((props.user) && (props.user.role === 'admin'))}
                              data-id={index}
                              size="small"
                              className={classes.bottomIcon}
                              color="primary"
                              onClick={addNewOrderItem}>
                            <AddIcon fontSize="small"/>
                          </IconButton>
                        </Grid>
                      </Fragment>
                  ))}
                </Fragment>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        : <Typography>Отсутствует информация о заказе</Typography>}
      <Divider className={classes.divider} />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentOrder: state.orders.currentOrder,
    statuses: state.statusesReducer.statuses,
    defaultOrderItemFields: state.newOrder.orderItems,
    currentOrderItems: state.orders.currentOrderItems,
    changedOrderItems: state.orders.changedOrderItems,
    cleaningItems: state.newOrder.cleaningItems,
    user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentOrder: (orderId) => dispatch(updateCurrentOrder(orderId)),
    getOrderItems: (orderId) => dispatch(getOrderItems(orderId)),
    putUpdateOrder: (orderId, order) => dispatch(putUpdateOrder(orderId, order)),
    getStatuses: () => dispatch(getStatuses()),
    updateCurrentOrderItems: (id, data) => dispatch(updateCurrentOrderItems(id, data)),
    setOrderItems: (order) => dispatch(setOrderItems(order)),
    setChangedOrderItems: (JSONString) => dispatch(setChangedOrderItems(JSONString)),
    getCleaningItems: () => dispatch(getCleaningItems()),
  };
};
export default connect(mapStateToProps , mapDispatchToProps)(OrderItems);
