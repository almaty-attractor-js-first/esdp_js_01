import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
	getCleaningTypes, saveCleaningType,
	setChangedCleaningTypes,
	setCleaningTypes, updateCleaningType,
	updateCleaningTypes
} from "../store/actions/cleaningTypesActions";
import EditableCleaningTypes from "../components/EditableTable/EditableCleaningTypes";
import uuid from "uuid";
import arrayMove from "array-move";


const CleaningTypes = (props) => {
	
	useEffect(() => {
		props.getCleaningTypes()
	}, []);
	//
	useEffect(() => {}, [props.cleaningTypes]);



	const handleAddNewType = () => {
		const tempTypes = [...props.cleaningTypes];
		const newType = {
			id: uuid.v4(),
			editable: true,
			name: '',
			title: '',
			price: '',
			status: false,
			position: null
		};
		const oldTypes = JSON.parse(props.changedCleaningTypes);
		if (oldTypes.length === props.cleaningTypes.length) {
			tempTypes.unshift(newType);
		}
		tempTypes.forEach((elem, index) => (
			elem.position = index + 1
		));
		props.setCleaningTypes(tempTypes);
	};

	const handleSetEditable = (id) => {
		const tempTypes = [...props.cleaningTypes];
		const index = tempTypes.findIndex(item => {return item.id === id});
		tempTypes[index].editable = false;
		tempTypes[index].editable = !tempTypes[index].editable;
		props.setCleaningTypes(tempTypes);
	};

	const handleSubmitChanges = id => {
		const tempTypes = [...props.cleaningTypes];
		const index = tempTypes.findIndex(item => {return item.id === id});
		tempTypes[index].editable = !tempTypes[index].editable;
		props.setCleaningTypes(tempTypes);
		const newTypes = JSON.stringify([...props.cleaningTypes]);
		props.setChangedCleaningTypes(newTypes);
		const oldTypes = JSON.parse(props.changedCleaningTypes);
		if (props.cleaningTypes.length === oldTypes.length) {
			props.updateCleaningType(tempTypes[index]);
		} else {
			props.saveCleaningType(tempTypes[index]);
			props.updateCleaningTypes(tempTypes);
		}
	};

	const handleDiscardChanges = (id) => {
		const tempTypes = [...props.cleaningTypes];
		const index = tempTypes.findIndex(item => {return item.id === id});
		tempTypes[index].editable = !tempTypes[index].editable;
		const oldTypes = JSON.parse(props.changedCleaningTypes);
		props.setCleaningTypes(oldTypes);
	};

	const handleOnOffStatus = (e, id) => {
		const tempTypes = [...props.cleaningTypes];
		const index = tempTypes.findIndex(item => {return item.id === id});
		tempTypes[index].status = e.target.checked;
		props.setCleaningTypes(tempTypes);
	};

// Обработчик завершения перемещения, используется helper arrayMove
	const onSortEnd = ({oldIndex, newIndex}) => {
		let tempTypes = [...props.cleaningTypes];
		tempTypes = arrayMove(tempTypes, oldIndex, newIndex);
		tempTypes.forEach((elem, index) => (
			elem.position = index + 1
		));
		props.setCleaningTypes(tempTypes);
		props.setChangedCleaningTypes(JSON.stringify(tempTypes));
		props.updateCleaningTypes(tempTypes);
	};

	const inputChangeHandler = (event, id) => {
		const tempTypes = [...props.cleaningTypes];
		const index = tempTypes.findIndex(item => {return item.id === id});
		tempTypes[index][event.target.name] = event.target.value;
		props.setCleaningTypes(tempTypes);
	};
	
	return (
		<EditableCleaningTypes cleaningTypes={props.cleaningTypes}
							   handleAddNewType={handleAddNewType}
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
		getCleaningTypes: () => dispatch(getCleaningTypes()),
		setChangedCleaningTypes: (array) => dispatch(setChangedCleaningTypes(array)),
		setCleaningTypes: (array) => dispatch(setCleaningTypes(array)),
		updateCleaningTypes: (array) => dispatch(updateCleaningTypes(array)),
		saveCleaningType: (type) => dispatch(saveCleaningType(type)),
		updateCleaningType: (type) => dispatch(updateCleaningType(type)),
	};
};

const mapStateToProps = state => {
	return {
		cleaningTypes: state.cleaningTypesReducer.cleaningTypes,
		changedCleaningTypes: state.cleaningTypesReducer.changedCleaningTypes
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CleaningTypes);