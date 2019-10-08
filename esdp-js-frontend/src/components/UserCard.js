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
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const UserCard = props => {
    const client = props.clients.find(client => {return client.id === props.id});

    return (
        <Fragment>
        {client &&
            <Card
                >
                    <CardHeader
                        title={`${client.firstName} ${client.lastName}`}
                    />
                    <Divider />
                    <CardContent>
                        <PerfectScrollbar>
                            <div>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell >Номер телефона:</TableCell>
                                            <TableCell >{`+${client.phone}`}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Email:</TableCell>
                                            <TableCell >{`${client.email}`}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Адрес 1:</TableCell>
                                            <TableCell >{`${client.address}`}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Адрес 2:</TableCell>
                                            <TableCell >{`${client.address}`}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Дата рождения:</TableCell>
                                            <TableCell >{client.birthDate ? `${client.birthDate}` : 'Нет информации'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </PerfectScrollbar>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button>Редактировать</Button>
                    </CardActions>
                </Card>
        }
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
