import React, {Fragment, useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import ClientRow from "../components/ClientRow";
import {getClients} from "../store/actions/clientsActions";


const useStyles = makeStyles(theme => ({
    root: {}
}));

const Clients = props => {

    useEffect(() => {
        props.getClients();
    }, []);

    const classes = useStyles();
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
                                        <TableCell>email</TableCell>
                                        <TableCell>Телефон</TableCell>
                                        <TableCell>Адрес</TableCell>
                                        <TableCell>Количество заказов</TableCell>
                                        <TableCell>Дата регистрации</TableCell>
                                    </Fragment>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ClientRow/>
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color="primary" size="small" variant="text">
                    Показать всех
                    <ArrowRightIcon />
                </Button>
            </CardActions>
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
