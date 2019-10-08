import React, {Fragment, useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {connect} from "react-redux";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Table,
} from '@material-ui/core';
import TableBody from "@material-ui/core/TableBody";
import {getClients} from "../store/actions/clientsActions";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const UserCard = props => {
    let total;
    if (props.clientOrders) {
        total = props.clientOrders.reduce(
            (accumulator, clientOrder) => accumulator + (clientOrder.totalPrice * props.clientOrders.length), 0
        );
    }


    return (
        <Fragment>
            {props.clientOrders && props.clientOrders.length ?
                <Card
                >
                    <CardHeader
                        title="Итого по заказам"
                    />
                    <Divider />
                    <CardContent>
                        <PerfectScrollbar>
                            <div>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell >Заказы в работе:</TableCell>
                                            <TableCell >
                                                {props.clientOrders.filter(order => {return order.statusName !== 'completed'}).length}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Всего заказов:</TableCell>
                                            <TableCell >{props.clientOrders.length}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Закрытые заказы:</TableCell>
                                            <TableCell >{props.clientOrders.filter(order => {return order.statusName === 'completed'}).length}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Отмененные заказы:</TableCell>
                                            <TableCell >{props.clientOrders.filter(order => {return order.statusName === 'canceled'}).length}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Заказов на сумму:</TableCell>
                                            <TableCell >{total}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </PerfectScrollbar>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button onClick={props.toOrders}>Заказы</Button>
                    </CardActions>
                </Card>
            : null}
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clientsReducer.clients,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClients: () => dispatch(getClients()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
