import Http from './httpService';
import * as Address from './address';
import Toast from 'react-native-tiny-toast';
import LocalStorage from '../common/storage';
import * as Config from '../common/Config';


class UserService {
    constructor() { }

    async login(param) {
        let res = await Http.postFetch(Address.LOGIN, param);
        if (res && !res.code) {
            try {
                Toast.show("Successful");
                await LocalStorage.save(Config.USER_INFO, JSON.stringify(res));
                await LocalStorage.save(Config.USER_NAME, param.user_name);
                return res;
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

export default new UserService();