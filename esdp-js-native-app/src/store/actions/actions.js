import axios from 'axios'
import { DATA_AVAILABLE } from "./../actions/action-types"


export const addData = (data) => ({
    type: DATA_AVAILABLE,
    data
});
