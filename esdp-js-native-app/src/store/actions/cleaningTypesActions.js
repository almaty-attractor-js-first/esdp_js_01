import {SET_CLEANING_TYPES} from "./actionTypes";
import axios from "../../axios-api";

export const setCleaningTypes = (array) => {
    return dispatch => {
        dispatch({type: SET_CLEANING_TYPES, array});
    }
};

export const getCleaningTypes = () => {
    return dispatch => {
        axios.get("/cleaning-items").then(response => {
            let data = response.data;
            dispatch(setCleaningTypes(data));
        },error => {
            if (error.response && error.response.data) {
            } else {
                dispatch(console.log("No internet connection"));
            }
        })
    }
};
