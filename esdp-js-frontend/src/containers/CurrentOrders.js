import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import OrderCard from "../components/OrderCard";
import {getStatuses} from "../store/actions/statusesActions";
import Typography from "@material-ui/core/Typography";


function SavedOrder(props)  {
    useEffect(() => {
        props.getStatuses();
    }, []);

    useEffect(() => {
    }, [props.savedOrder, props.statuses]);

    return (
        <Fragment>
            <Typography variant="h4" gutterBottom>
                Список заказов!
            </Typography>
            {props.clientOrders.map(order => (
                <OrderCard
                    key={order.id}
                    order={order}
                    statuses={props.statuses}
                    defaultExpanded={false}/>
            ))}
        </Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        getStatuses: () => dispatch(getStatuses()),
    };
};

const mapStateToProps = state => {
    return {
        clientOrders: state.clientsReducer.clientOrders,
        statuses: state.statusesReducer.statuses
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedOrder);
