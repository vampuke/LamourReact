import { USER, WISH_LIST, SET_WISH_FILTER, VOUCHER_LIST, SET_VOUCHER_FILTER } from './actionTypes';

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

export const voucher_list = voucherList => ({
    type: VOUCHER_LIST,
    payload: {
        voucherList
    }
})

export const voucherFilter = filter => ({ type: SET_VOUCHER_FILTER, payload: { filter } });