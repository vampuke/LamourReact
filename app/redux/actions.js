import { USER, WISH_LIST, SET_WISH_FILTER } from './actionTypes';

export const user = userInfo => ({
    type: USER,
    payload: {
        userInfo
    }
})

export const wish_list = wishList => ({
    type: WISH_LIST,
    payload: {
        wishList
    }
})

export const wishFilter = filter => ({ type: SET_WISH_FILTER, payload: { filter } });