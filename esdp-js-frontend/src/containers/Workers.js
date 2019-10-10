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
import WorkerRow from "../components/WorkerRow";
import {getWorkers} from "../store/actions/workersActions";

const Workers = props => {
    useEffect(() => {
        props.getWorkers();
    }, []);


    return (
        <Card
        >
            <CardHeader
                title="Список сотрудников"
            />
            <Divider />
            <CardContent>
                <PerfectScrollbar>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Fragment>
                                        <TableCell>ID сотрудника</TableCell>
                                        <TableCell>ФИО</TableCell>
                                        <TableCell align='right'>email</TableCell>
                                        <TableCell align='right'>Телефон</TableCell>
                                        <TableCell align='right'>Должность</TableCell>
                                        <TableCell align='right'>Статус</TableCell>
                                    </Fragment>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <WorkerRow workers={props.workers}/>
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

Workers.propTypes = {
    className: PropTypes.string
};

const mapStateToProps = state => {
    return {
        workers: state.workersReducer.workers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getWorkers: () => dispatch(getWorkers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);
