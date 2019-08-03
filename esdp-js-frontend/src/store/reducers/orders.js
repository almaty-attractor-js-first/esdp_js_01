import {UPDATE_ORDERS} from "../actions/actionTypes";

const initialState = {
    orders: [
        // {
        //     _id: 1,
        //     name: 'Vasya',
        //     surname: 'Pupkin',
        //     price: 12000,
        //     email: 'vasya@pupkin.com',
        //     date: '2019-06-07T15:31:41.540+00:00',
        //     telephone: 87476363122,
        //     typeofcleaning: 'lite',
        //     numberofpairs: 1,
        //     deliverytype: 'delivery',
        //     address: 'Almaty Djandosova 10',
        //     status: 'ready'
        // },
        // {
        //     _id: 2,
        //     name: 'Marina',
        //     surname: 'Pupkina',
        //     price: 11000,
        //     email: 'marina@pupkina.com',
        //     date: '2019-06-07T15:31:41.540+00:00',
        //     telephone: 87471112333,
        //     typeofcleaning: 'lhard',
        //     numberofpairs: 1,
        //     deliverytype: 'pickup',
        //     status: 'inwork'
        // }
        ]
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ORDERS:
            console.log(action.orders)
            return {...state, orders: action.orders};
        default:
            return state;
    }
};

export default reducer;
