import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {updateCurrentOrder, getStatuses} from "../../store/actions/ordersActions";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
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
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const OrderItems = props => {
  const classes = useStyles();
  const [currentOrder, setCurrentOrder] = React.useState(props.currentOrder);

  useEffect(() => {
    props.updateCurrentOrder(props.match.params.id);
  }, []);

  useEffect(() => {
    setCurrentOrder(props.currentOrder);
  }, [props.currentOrder]);

  useEffect(() => {
    props.getStatuses();
  }, []);

  return (
    <div>
      {currentOrder ?
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
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
                        {currentOrder.id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Клиент</TableCell>
                      <TableCell align="left">
                        <div>
                          <Link component={RouterLink} to={`/order/${props.match.params.id}`}>
                            {`${currentOrder.firstName} ${currentOrder.lastName}` || 'Информация отсутствует'}
                          </Link>
                        </div>
                        <span>{currentOrder.phone}</span>
                        <div>{currentOrder.address}</div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Master</TableCell>
                      <TableCell align="left">
                        Олежка
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Дата заказа</TableCell>
                      <TableCell align="left">
                        {
                          moment(currentOrder.createdAt).format('DD.MM.YYYY HH:mm')
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Сумма заказа</TableCell>
                      <TableCell align="left">
                        {currentOrder.totalPrice}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Статус</TableCell>
                      <TableCell align="left">
                        <FormControl className={classes.formControl}>
                          <TextField
                            select
                            // helperText="Изменить статус"
                            className={classes.textField}
                            value
                            SelectProps={{
                              native: true,
                              MenuProps: {
                                className: classes.menu,
                              },
                            }}
                            margin="normal"
                          >
                            {props.statuses.map(option => (
                              <option key={option.name} value={option.name}>
                                {option.title}
                              </option>
                            ))}
                          </TextField>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </PerfectScrollbar>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card>
              <CardHeader title="Лоты заказа"/>
              <Divider className={classes.divider} />
              <CardContent>
                <PerfectScrollbar>
                <div className={classes.inner}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Тип чистки</TableCell>
                      <TableCell align="left">Количество</TableCell>
                      <TableCell align="left">Стоимость</TableCell>
                    </TableRow>
                    {currentOrder.orderItems ?
                      currentOrder.orderItems.map((orderItem, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">
                            {orderItem.title}
                          </TableCell>
                          <TableCell align="left">
                            {orderItem.qty}
                          </TableCell>
                          <TableCell align="left">
                            {orderItem.price}
                          </TableCell>
                        </TableRow>
                      ))
                      : null
                    }
                  </TableBody>
                </Table>
                </div>
                </PerfectScrollbar>
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
    statuses: state.orders.statuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentOrder: (orderId) => dispatch(updateCurrentOrder(orderId)),
    getStatuses: () => dispatch(getStatuses()),
  };
};
export default connect(mapStateToProps , mapDispatchToProps)(OrderItems);
