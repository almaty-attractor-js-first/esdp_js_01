import React, {useEffect} from 'react';
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {getClientOrdersById, getClients, updateClientOrders} from "../store/actions/clientsActions";
import UserCard from "../components/UserCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SummaryCard from "../components/SummaryCard";
import Orders from "./Orders";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginBottom: '15px'
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Grid container spacing={2}>{children}</Grid>
        </div>
    );
}
const UserInfo = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toOrders = () => {
        setValue(1);
    };

    useEffect(() => {
        props.getClients();
    }, []);

    useEffect(() => {
        props.getClientOrdersById(props.match.params.id);
        return () => {
            props.updateClientOrders([]);
        }
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Информация о клиенте" />
                        <Tab label="История заказов" />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <Grid item md={6} xs={12}>
                        <UserCard clients={props.clients} id={props.match.params.id}/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <SummaryCard clientOrders={props.clientOrders} toOrders={toOrders}/>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid item xs={12}>
                        <Orders clientOrders={props.clientOrders} id={props.match.params.id}/>
                    </Grid>
                </TabPanel>
            </Grid>

        </Grid>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clientsReducer.clients,
        clientOrders: state.clientsReducer.clientOrders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClientOrdersById: (id) => dispatch(getClientOrdersById(id)),
        getClients: () => dispatch(getClients()),
        updateClientOrders: () => dispatch(updateClientOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
