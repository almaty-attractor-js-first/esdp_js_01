import {ENQUEUE_SNACKBAR, REMOVE_SNACKBAR} from "./actionTypes";


export const enqueueSnackbar = notification => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});

export const openSnack = (message, variant) => (dispatch) => {
    dispatch(enqueueSnackbar({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: variant,
            autoHideDuration: 700,
        },
    }));
};
