import { NativeModules, DeviceEventEmitter } from 'react-native';


class HttpManager {

    constructor() {

    };

    async getFetch(url) {
        try {
            let response = await fetch(url);
            if (response.status == 200) {
                let responseJson = await response.json();
                return responseJson;
            }
            else {
                console.log(response);
                return false;
            };
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async postFetch(url, param) {
        try {
            let headers = new Headers({
                'Content-Type': "application/json"
            });
            let response = await fetch(url, { method: 'POST', body: JSON.stringify(param), headers: headers });
            if (response.status == 200) {
                let responseJson = await response.json();
                return responseJson;
            }
            else return false;
        } catch (err) {
            return false;
        }
    }

}

export default new HttpManager();