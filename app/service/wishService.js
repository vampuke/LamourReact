import Http from './httpService';
import * as Address from './address';
import Toast from 'react-native-tiny-toast';



class WishService {
    constructor() { }

    async getWishList() {
        let res = await Http.getFetch(Address.WISH);
        if (res && !res.code) {
            try {
                return res.wish;
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

    async wishStatus(param) {
        let res = await Http.postFetch(Address.WISH, param);
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

    async deleteWish(param) {
        let res = await Http.deleteFetch(Address.WISH + "/delete/" + param);
        if (res && res.code == 200) {
            try {
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

export default new WishService();