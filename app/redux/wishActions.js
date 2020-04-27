import { WISH_FILTERS } from "../common/constant";

export const getWishState = store => store.wish_list;

export const getWishList = store => getWishState(store) ? getWishState(store).wishList : [];

export const getWishByFilter = (store, wishFilter) => {
    const wish_list = getWishList(store);
    if (wish_list && wish_list.length) {
        switch (wishFilter) {
            case WISH_FILTERS.COMPLETE:
                return wish_list.filter(wish => wish.status == WISH_FILTERS.COMPLETE);
            case WISH_FILTERS.INCOMPLETE:
                return wish_list.filter(wish => wish.status == WISH_FILTERS.INCOMPLETE);
            default:
                return wish_list
        }
    } else {
        return wish_list;
    }
}

export const getWishListNumber = (store, wishFilter) => {
    const wish_list = getWishList(store);
    if (wish_list && wish_list.length) {
        switch (wishFilter) {
            case WISH_FILTERS.COMPLETE:
                return wish_list.filter(wish => wish.status == WISH_FILTERS.COMPLETE).length;
            case WISH_FILTERS.INCOMPLETE:
                return wish_list.filter(wish => wish.status == WISH_FILTERS.INCOMPLETE).length;
            default:
                return wish_list.length;
        }
    } else {
        return wish_list.length;
    }
}