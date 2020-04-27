import { WISH_LIST } from '../actionTypes';

const initialState = {
    wishList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case WISH_LIST:
            return {
                ...state,
                wishList: action.payload.wishList
            }
        default:
            return state;
    }
}