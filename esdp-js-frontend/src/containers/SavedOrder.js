import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import OrderCard from "../components/OrderCard";
import {getStatuses} from "../store/actions/statusesActions";
import {updateSavedOrder} from "../store/actions/newOrderActions";
import Typography from "@material-ui/core/Typography";


function SavedOrder(props)  {
	useEffect(() => {
		props.getStatuses();
	}, []);

	useEffect(() => {
		return () => {
			props.updateSavedOrder([]);
		};
	}, []);

	useEffect(() => {
	}, [props.savedOrder, props.statuses]);
	return (
		<Fragment>
			<Typography variant="h4" gutterBottom>
				Ваш заказ успешно создан!
			</Typography>
			<OrderCard
				order={props.savedOrder}
				statuses={props.statuses}
				defaultExpanded={true}/>
		</Fragment>
		);
}

//image={`${config.apiURL}/uploads/${this.props.photo}`}
const mapDispatchToProps = dispatch => {
	return {
		getStatuses: () => dispatch(getStatuses()),
		updateSavedOrder: (order) => dispatch(updateSavedOrder(order))
	};
};

const mapStateToProps = state => {
	return {
		savedOrder: state.newOrder.savedOrder,
		statuses: state.statusesReducer.statuses
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedOrder);
