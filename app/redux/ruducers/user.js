import { USER } from '../actionTypes';

const initialState = {
    userInfo: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER:
            console.log(action.payload);
            return {
                ...state,
                userInfo: action.payload.userInfo
            }
        default:
            return state;
    }
}