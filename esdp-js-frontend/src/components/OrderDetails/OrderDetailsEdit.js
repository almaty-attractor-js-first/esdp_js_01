import React, {useEffect, useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    updateCurrentOrder,
    getStatuses,
    updateOrders,
    putUpdateOrder
} from "../../store/actions/ordersActions";
import moment from "moment";
import {connect} from "react-redux";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
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
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import SvgIcon from "@material-ui/core/SvgIcon";

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
    }
}));

const OrderItemsEdit = props => {
    const { history } = props;
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

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            firstName: props.currentOrder.firstName,
            lastName: props.currentOrder.lastName,
            phone: props.currentOrder.phone,
            address: props.currentOrder.address
        }
    );
    
    const handleChange = e => {
        const {name, value} = e.target;
        setUserInput({[name]: value});
    };
    
    const handleChangeStatus = (event, id) => {
        const _tempOrders = [...props.orders];
        const index = _tempOrders.findIndex(order => {return order.id === id});
        _tempOrders[index][event.target.name] = event.target.value;
        props.updateOrders(_tempOrders);
    };
    
    const updateOrder = (id) => {
        const _tempOrders = [...props.orders];
        const index = _tempOrders.findIndex(order => {return order.id === currentOrder.id});
        _tempOrders[index] = {..._tempOrders[index], ...userInput};
        props.updateOrders(_tempOrders);
        props.putUpdateOrder(id, _tempOrders[index]).then(history.push(`/order/${currentOrder.id}`));
    };
    
    return (
        <div>
            <div style={{ width: '100%' }}>
                <Box display="flex" p={1} >
                    <Box p={1} flexGrow={1} >
                        <Button
                            color='primary'
                            variant='outlined'
                            // component={RouterLink}
                            className={classes.link}
                            onClick={() => updateOrder(props.currentOrder.id)}
                        >
                            <SvgIcon >
                                <path d="M3 17.25 V 21 h 3.75 L 17.81 9.94 l -3.75 -3.75 L 3
                            17.25 Z M 20.71 7.04 c 0.39 -0.39 0.39 -1.02 0 -1.41 l -2.34
                            -2.34 a 0.9959 0.9959 0 0 0 -1.41 0 l -1.83 1.83 l 3.75 3.75 l 1.83 -1.83 Z"/>
                            </SvgIcon>
                            Сохранить
                        </Button>
                    </Box>
                    <Box p={1} >
                        <Button component={RouterLink} to={`/order/${props.currentOrder.id}`} color='primary' variant='outlined'>
                            Отменить
                        </Button>
                    </Box>
                </Box>
            </div>
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
                                                        <TextField
                                                            value={userInput.firstName}
                                                            required
                                                            id="firstName"
                                                            name="firstName"
                                                            fullWidth
                                                            onChange={handleChange}
                                                        />
                                                        <TextField
                                                            value={userInput.lastName}
                                                            required
                                                            id="lastName"
                                                            name="lastName"
                                                            fullWidth
                                                            onChange={handleChange}
                                                        />
                                                    <TextField
                                                        value={userInput.phone}
                                                        required
                                                        id="phone"
                                                        name="phone"
                                                        fullWidth
                                                        onChange={handleChange}
                                                    />
                                                    <TextField
                                                        value={userInput.address}
                                                        required
                                                        id="address"
                                                        name="address"
                                                        fullWidth
                                                        onChange={handleChange}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">Master</TableCell>
                                                <TableCell align="left">
                                                <TextField
                                                    value="Олежка"
                                                    required
                                                    id="master"
                                                    name="master"
                                                    fullWidth
                                                    onChange={handleChange}
                                                />
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
                                                <TableCell align="left">
                                                    <FormControl className={classes.formControl}>
                                                        <TextField
                                                            select
                                                            // helperText="Изменить статус"
                                                            className={classes.textField}
                                                            value={currentOrder.status}
                                                            onChange={(e) => {handleChangeStatus(e, props.match.params.id);}}
                                                            inputProps={{
                                                                name: 'status',
                                                                id: 'status',
                                                            }}
                                                            SelectProps={{
                                                                native: true,
                                                                MenuProps: {
                                                                    className: classes.menu,
                                                                },
                                                            }}
                                                            margin="normal"
                                                        >
                                                            {props.statuses.map(status => (
                                                                <option key={status.name} value={status.name}>
                                                                    {status.title}
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
                            <CardActions>

                            </CardActions>
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
        orders: state.orders.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentOrder: (orderId) => dispatch(updateCurrentOrder(orderId)),
        getStatuses: () => dispatch(getStatuses()),
        updateOrders: (order) => dispatch(updateOrders(order)),
        putUpdateOrder: (id, order) => dispatch(putUpdateOrder(id, order))
    };
};
export default connect(mapStateToProps , mapDispatchToProps)(OrderItemsEdit);
