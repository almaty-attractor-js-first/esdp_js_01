import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import CurrentOrderCard from "../components/CurrentOrderCard";
import {getStatuses} from "../store/actions/statusesActions";
import {updateSavedOrder} from "../store/actions/newOrderActions";


function CurrentOrder(props)  {
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
			<CurrentOrderCard
				savedOrder={props.savedOrder}
				statuses={props.statuses}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
