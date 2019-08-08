import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
    orderItems: [],
    paymentMethod: "cash",
    paymentStatus: false,
    phone: "7476396538",
    status: "inwork",
    totalPrice: "1200",
};

const OrderItems = props => {
    useEffect(() => {
        console.log("yes")
    }, []);


    const classes = useStyles();
    const statuses = [
        {name: "pending", title: "В обработке", color: 'orange', status: true},
        {name: "inWork", title: "В работе", color: 'indigo', status: true},
        {name: "completed", title: "Завершён", color: 'green', status: true},
        {name: "rejected", title: "Отклонён", color: 'red', status: true},
        {name: "canceled", title: "Отменён", color: 'grey', status: true}
    ];
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    return (
        <div>
            <Typography variant="subtitle1" gutterBottom>
                Material-UI Grid:
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Card>
                      <CardHeader title="Order info"/>
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
                    <Paper className={classes.paper}>Left</Paper>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

        </div>
    );
};

export default OrderItems;