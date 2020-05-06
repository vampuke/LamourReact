import { VOUCHER_LIST } from "../actionTypes";

const initialState = {
    voucherList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VOUCHER_LIST:
            return {
                ...state,
                voucherList: action.payload.voucherList
            }
        default:
            return state;
    }
}