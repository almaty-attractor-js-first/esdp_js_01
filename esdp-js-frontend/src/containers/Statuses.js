import React, {useEffect} from 'react';
import EditableStatuses from '../components/EditableTable/EditableStatuses'
import {connect} from "react-redux";
import uuid from "uuid";
import arrayMove from "array-move";
import {
	getStatuses,
	saveStatus,
	setChangedStatuses,
	setStatuses,
	updateStatus,
	updateStatuses
} from "../store/actions/statusesActions";


const Statuses = (props) => {

	useEffect(() => {
		props.getStatuses()
	}, []);
	//
	useEffect(() => {
	}, [props.statuses]);


	const handleAddNewStatus = () => {
		const tempStatuses = [...props.statuses];
		const newStatus = {
			id: uuid.v4(),
			editable: true,
			name: '',
			title: '',
			color: '#282c34',
			status: false,
			position: null
		};
		const oldStatuses = JSON.parse(props.changedStatuses);
		if (oldStatuses.length === props.statuses.length) {
			tempStatuses.unshift(newStatus);
		}
		tempStatuses.forEach((elem, index) => (
			elem.position = index + 1
		));
		props.setStatuses(tempStatuses);
	};
	
	const handleSetEditable = (id) => {
		const tempStatuses = [...props.statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].editable = false;
		tempStatuses[index].editable = !tempStatuses[index].editable;
		props.setStatuses(tempStatuses);
	};
	
	const handleSubmitChanges = id => {
		const tempStatuses = [...props.statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].editable = !tempStatuses[index].editable;
		props.setStatuses(tempStatuses);
		const newStatuses = JSON.stringify([...props.statuses]);
		props.setChangedStatuses(newStatuses);
		const oldStatuses = JSON.parse(props.changedStatuses);
		if (props.statuses.length === oldStatuses.length) {
			props.updateStatus(tempStatuses[index]);
		} else {
			props.saveStatus(tempStatuses[index]);
			props.updateStatuses(tempStatuses);
		}
	};
	
	const handleDiscardChanges = (id) => {
		const tempStatuses = [...props.statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].editable = !tempStatuses[index].editable;
		const oldStatuses = JSON.parse(props.changedStatuses);
		props.setStatuses(oldStatuses);
	};
	
	const handleOnOffStatus = (e, id) => {
		const tempStatuses = [...props.statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index].status = e.target.checked;
		props.setStatuses(tempStatuses);
	};

// Обработчик завершения перемещения, используется helper arrayMove
	const onSortEnd = ({oldIndex, newIndex}) => {
		let tempStatuses = [...props.statuses];
		tempStatuses = arrayMove(tempStatuses, oldIndex, newIndex);
		tempStatuses.forEach((elem, index) => (
			elem.position = index + 1
		));
		props.setStatuses(tempStatuses);
		props.setChangedStatuses(JSON.stringify(tempStatuses));
		props.updateStatuses(tempStatuses);
	};

	const inputChangeHandler = (event, id) => {
		const tempStatuses = [...props.statuses];
		const index = tempStatuses.findIndex(item => {return item.id === id});
		tempStatuses[index][event.target.name] = event.target.value;
		props.setStatuses(tempStatuses);
	};
	return (
		<EditableStatuses statuses={props.statuses}
						  handleAddNewStatus={handleAddNewStatus}
		                  handleSetEditable={handleSetEditable}
		                  handleSubmitChanges={handleSubmitChanges}
		                  handleDiscardChanges={handleDiscardChanges}
		                  handleOnOffStatus={handleOnOffStatus}
		                  onSortEnd={onSortEnd}
		                  inputChangeHandler={inputChangeHandler}
		/>
	)
};

const mapDispatchToProps = dispatch => {
	return {
		getStatuses: () => dispatch(getStatuses()),
		setStatuses: (array) => dispatch(setStatuses(array)),
		setChangedStatuses: (array) => dispatch(setChangedStatuses(array)),
		updateStatuses: (array) => dispatch(updateStatuses(array)),
		saveStatus: (status) => dispatch(saveStatus(status)),
		updateStatus: (status) => dispatch(updateStatus(status)),
	};
};

const mapStateToProps = state => {
	return {
		statuses: state.statusesReducer.statuses,
		changedStatuses: state.statusesReducer.changedStatuses
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Statuses);