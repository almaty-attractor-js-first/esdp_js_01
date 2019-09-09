import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getCleaningTypes, setChangedCleaningTypes} from "../store/actions/cleaningTypesActions";
import EditableCleaningTypes from "../components/EditableTable/EditableCleaningTypes";


const CleaningTypes = (props) => {
	
	useEffect(() => {
		props.getCleaningTypes()
	}, []);
	//
	useEffect(() => {}, [props.cleaningTypes]);
	
	return (
		<EditableCleaningTypes cleaningTypes={props.cleaningTypes}/>
	)
};

const mapDispatchToProps = dispatch => {
	return {
		getCleaningTypes: () => dispatch(getCleaningTypes()),
		setChangedCleaningTypes: (array) => dispatch(setChangedCleaningTypes(array)),	};
};

const mapStateToProps = state => {
	return {
		cleaningTypes: state.cleaningTypesReducer.cleaningTypes,
		changedCleaningTypes: state.cleaningTypesReducer.changedCleaningTypes
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CleaningTypes);