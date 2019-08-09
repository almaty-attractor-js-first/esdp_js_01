import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import moment from "moment";

import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableCell,
    TableRow
} from "@material-ui/core";

import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {getCleaningItems} from "../../store/actions/newOrderActions";
import {connect} from "react-redux";

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
        padding: 0
    },
    inner: {
        minWidth: 800
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
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));


const order = {
    address: "Абая Саина 54",
    clientId: "1",
    completedDate: "2019-08-02T15:17:48.831Z",
    createdAt: "2019-08-02T15:17:48.831Z",
    deliveryType: "self",
    description: "помыть",
    email: "greenmassa@gmail.com",
    firstName: "James",
    id: "4",
    lastName: "Bond",
    masterId: "1",
    orderItems: [
        {
            cleaningType: "sneakers",
            qty: "1",
            price: 1500,
            title: "Кроссовки"
        },
        {
            cleaningType: "boots",
            qty: 1,
            price: 2600,
            title: "Ботинки"
        }
    ],
    paymentMethod: "cash",
    paymentStatus: false,
    phone: "7476396538",
    status: "inwork",
    totalPrice: "1200",
};

const OrderItems = props => {
    useEffect(() => {
        console.log(this.props.match.params.id)
        // findOrder(this.props.match.params.id)
    }, []);


    const classes = useStyles();
    const statuses = [
        {name: "pending", title: "В обработке", color: 'orange', status: true},
        {name: "inWork", title: "В работе", color: 'indigo', status: true},
        {name: "completed", title: "Завершён", color: 'green', status: true},
        {name: "rejected", title: "Отклонён", color: 'red', status: true},
        {name: "canceled", title: "Отменён", color: 'grey', status: true}
    ];
    const [values, setStatus] = React.useState({});
    const findOrder =(id) => {
        console.log(id);
    };
    const handleChange = name => event => {
        setStatus({ ...values, [name]: event.target.value });
    };
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Card>
                      <CardHeader title="Информация о заказе"/>
                      <Divider className={classes.divider} />
                      <CardContent>
                          <Table>
                              <TableBody>
                                  <TableRow>
                                      <TableCell align="left">ID заказа</TableCell>
                                      <TableCell align="center">
                                          {order.id}
                                      </TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell align="left">Customer</TableCell>
                                      <TableCell align="center">
                                         <span>{order.firstName}</span>
                                          <span>{order.address}</span>
                                      </TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell align="left">Master</TableCell>
                                      <TableCell align="center">
                                         Олежка
                                      </TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell align="left">Дата заказа</TableCell>
                                      <TableCell align="center">
                                          {
                                              moment(order.createdAt).format('DD.MM.YYYY HH:mm')
                                          }
                                      </TableCell>
                                  </TableRow>
                                  <TableRow>
                                      <TableCell align="left">Сумма заказа</TableCell>
                                      <TableCell align="center">
                                          {order.totalPrice}
                                      </TableCell>
                                  </TableRow>
                              </TableBody>
                          </Table>
                          <FormControl>
                              <TextField
                                  id="outlined-select-currency-native"
                                  select
                                  label="Изменить статус"
                                  className={classes.textField}
                                  value={values.currency}
                                  onChange={handleChange('currency')}
                                  SelectProps={{
                                      native: true,
                                      MenuProps: {
                                          className: classes.menu,
                                      },
                                  }}
                                  margin="normal"
                                  variant="outlined"
                              >
                                  {statuses.map(option => (
                                      <option key={option.name} value={option.name}>
                                          {option.title}
                                      </option>
                                  ))}
                              </TextField>
                          </FormControl>
                      </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader title="Лоты заказа"/>
                        <Divider className={classes.divider} />
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Тип  чистки</TableCell>
                                        <TableCell align="left">Количество</TableCell>
                                        <TableCell align="left">Стоимость заказа</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">
                                            {order.orderItems[0].title}
                                        </TableCell>
                                        <TableCell align="left">
                                            {order.orderItems[0].qty}
                                        </TableCell>
                                        <TableCell align="left">
                                            {order.orderItems[0].price}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">
                                            {order.orderItems[1].title}
                                        </TableCell>
                                        <TableCell align="left">
                                            {order.orderItems[1].qty}
                                        </TableCell>
                                        <TableCell align="left">
                                            {order.orderItems[1].price}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </div>
    );
};
const mapStateToProps = state => {
    return {
        defaultOrderItemFields: state.newOrder.orderItems,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCleaningItems: () => dispatch(getCleaningItems()),
    };
};
export default connect(mapStateToProps , mapDispatchToProps)(OrderItems);