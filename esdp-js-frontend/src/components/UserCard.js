import React, {Fragment, useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {connect} from "react-redux";
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Table, makeStyles,
} from '@material-ui/core';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    margin: {
        padding: '5px 70px',
    }
}));

const UserCard = props => {
    const classes = useStyles();
    const client = props.clients.find(client => {return client.id === props.id});
    const [editable, setEditable] = React.useState(false);

    const inputChangeHandler = (event) => {
        client[event.target.name] = event.target.value;
    };

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
                                            <TableCell className={editable ? classes.margin : ''}>
                                                {editable ?
                                                    <TextField
                                                        name={"phone"}
                                                        value={client.phone}
                                                        onChange={inputChangeHandler}
                                                        margin="none"
                                                        id={"name" + props.index}
                                                        inputProps={{
                                                            style: {textAlign: 'left'}
                                                        }}
                                                /> : `+${client.phone}`}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Email:</TableCell>
                                            <TableCell className={editable ? classes.margin : ''}>{editable ?
                                                <TextField
                                                    name={"email"}
                                                    value={client.email}
                                                    onChange={inputChangeHandler}
                                                    margin="none"
                                                    id={"name" + props.index}
                                                    inputProps={{
                                                        style: {textAlign: 'left'}
                                                    }}
                                                /> : `${client.email}`}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Адрес 1:</TableCell>
                                            <TableCell className={editable ? classes.margin : ''}>{editable ?
                                                <TextField
                                                    name={"address"}
                                                    value={client.address}
                                                    onChange={inputChangeHandler}
                                                    margin="none"
                                                    id={"name" + props.index}
                                                    inputProps={{
                                                        style: {textAlign: 'left'}
                                                    }}
                                                /> : `${client.address}`}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Адрес 2:</TableCell>
                                            <TableCell className={editable ? classes.margin : ''}>{editable ?
                                                <TextField
                                                    name={"address"}
                                                    value={client.address}
                                                    onChange={inputChangeHandler}
                                                    margin="none"
                                                    id={"name" + props.index}
                                                    inputProps={{
                                                        style: {textAlign: 'left'}
                                                    }}
                                                /> : `${client.address}`}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell >Дата рождения:</TableCell>
                                            <TableCell className={editable ? classes.margin : ''}>{editable ?
                                                <TextField
                                                    name={"birthDate"}
                                                    value={client.birthDate || ''}
                                                    onChange={inputChangeHandler}
                                                    margin="none"
                                                    id={"name" + props.index}
                                                    inputProps={{
                                                        style: {textAlign: 'left'}
                                                    }}
                                                /> : client.birthDate ? `${client.birthDate}` : 'Нет информации'}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </PerfectScrollbar>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        {!editable && <Button onClick={() => setEditable(true)}>Редактировать</Button>}
                        {editable && <Button onClick={() => setEditable(!editable)} color='primary'>Сохранить</Button>}
                        {editable && <Button onClick={() => setEditable(!editable)} color='secondary'>Отменить</Button>}
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
