import { combineReducers } from "redux";
import user from "./user";
import wish_list from './wishList';
import wishDisplayFilter from './wishFilter';

export default combineReducers({ user, wish_list, wishDisplayFilter });
