import Http from './httpService';
import * as Address from './address';
import Toast from 'react-native-tiny-toast';



class AnnivService {
    constructor() { }

    async getAnnivList() {
        let res = await Http.getFetch(Address.ANNIV);
        if (res && !res.code) {
            try {
                return res.anniv;
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

    async postAnniv(param) {
        let res = await Http.postFetch(Address.ANNIV, param);
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

export default new AnnivService();