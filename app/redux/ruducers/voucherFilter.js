import { GENDER_FILTERS } from "../../common/constant";
import { SET_VOUCHER_FILTER } from "../actionTypes";

const initialState = GENDER_FILTERS.SHE;

const voucherDisplayFilter = (state = initialState, action) => {
    switch (action.type) {
        case SET_VOUCHER_FILTER:
            return action.payload.filter;
        default:
            return state;
    }
}

export default voucherDisplayFilter;