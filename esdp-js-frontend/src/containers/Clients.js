import React, {Fragment, useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Table,
    TableCell,
    TableHead,
} from '@material-ui/core';
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import ClientRow from "../components/ClientRow";
import {getClients} from "../store/actions/clientsActions";

const Clients = props => {

    useEffect(() => {
        props.getClients();
    }, []);

    return (
        <Card
        >
            <CardHeader
                title="Список клиентов"
            />
            <Divider />
            <CardContent>
                <PerfectScrollbar>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Fragment>
                                        <TableCell>ID клиента</TableCell>
                                        <TableCell>ФИО</TableCell>
                                        <TableCell align='right'>email</TableCell>
                                        <TableCell align='right'>Телефон</TableCell>
                                        <TableCell align='right'>Адрес</TableCell>
                                        <TableCell align='right'>Дата регистрации</TableCell>
                                    </Fragment>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ClientRow clients={props.clients}/>
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

Clients.propTypes = {
    className: PropTypes.string
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

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
