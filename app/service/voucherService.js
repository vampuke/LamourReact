import Http from './httpService';
import * as Address from './address';
import Toast from 'react-native-tiny-toast';



class VoucherService {
    constructor() { }

    async getVoucher() {
        let res = await Http.getFetch(Address.AVAIL_VOUCHER);
        if (res && !res.code) {
            try {
                return res.voucher;
            }
            catch (err) { return false }
        }
        else if (res && res.code) {
            Toast.show(res.msg);
            return false;
        }
        else {
            Toast.show('Network error')
            return false;
        }
    }

    async postVoucher(param) {
        let res = await Http.postFetch(Address.VOUCHER, param);
        if (res && res.code == 200) {
            try {
                Toast.show("Successful");
                return true;
            }
            catch (err) { return false; }
        }
        else if (res && res.code) {
            Toast.show(res.msg);
            return false;
        }
        else {
            Toast.show('Network error')
            return false;
        }
    }
}

export default new VoucherService();