import axios from 'axios'
import {} from "./action-types";

export const DATA_AVAILABLE = 'DATA_AVAILABLE';

export const addData = (data) => ({
    type: DATA_AVAILABLE,
    data
});
