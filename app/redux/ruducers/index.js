import { combineReducers } from "redux";
import user from "./user";
import wish_list from './wishList';
import wishDisplayFilter from './wishFilter';
import voucher_list from './voucherList';
import voucherDisplayFilter from './voucherFilter';

export default combineReducers({
    user,
    wish_list,
    wishDisplayFilter,
    voucher_list,
    voucherDisplayFilter
});
