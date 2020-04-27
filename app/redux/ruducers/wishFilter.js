import { WISH_FILTERS } from "../../common/constant";
import { SET_WISH_FILTER } from "../actionTypes";

const initialState = WISH_FILTERS.INCOMPLETE;

const wishDisplayFilter = (state = initialState, action) => {
    switch (action.type) {
        case SET_WISH_FILTER: {
            return action.payload.filter;
        }
        default: {
            return state;
        }
    }
};

export default wishDisplayFilter;
