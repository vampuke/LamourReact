import { GENDER_FILTERS, VOUCHER_TYPE } from "../common/constant";

export const getVoucherState = store => store.voucher_list;

export const getVoucherList = store => getVoucherState(store) ? getVoucherState(store).voucherList : [];

export const getVoucherByFilter = (store, voucherFilter) => {
    const voucher_list = getVoucherList(store);
    if (voucher_list && voucher_list.length) {
        for (let voucher of voucher_list) {
            if (voucher.type == VOUCHER_TYPE.LIMITED) {
                voucher.daysLeft = ((Number(voucher.datetime_expire) - Date.parse(new Date())) / 86400000).toFixed(0);
            }
            voucher.date_create = new Date(voucher.datetime_create).getFullYear().toString() + "-" + (new Date(voucher.datetime_create).getMonth() + 1).toString() + '-' + new Date(voucher.datetime_create).getDate().toString();
            voucher.date_expire = new Date(voucher.datetime_expire).getFullYear().toString() + "-" + (new Date(voucher.datetime_expire).getMonth() + 1).toString() + '-' + new Date(voucher.datetime_expire).getDate().toString();
        }
        switch (voucherFilter) {
            case GENDER_FILTERS.SHE:
                return voucher_list.filter(voucher => voucher.user_id == GENDER_FILTERS.SHE);
            case GENDER_FILTERS.HE:
                return voucher_list.filter(voucher => voucher.user_id == GENDER_FILTERS.HE);
            default:
                return voucher_list;
        }
    } else {
        return voucher_list;
    }
}