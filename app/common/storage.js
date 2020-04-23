import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage {
    constructor() { }

    async save(key, content) {
        try {
            await AsyncStorage.setItem(key, content);
        }
        catch (err) { }
    }

    async read(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
            else return false;
        }
        catch (err) {
            return false;
        }
    }
}

export default new LocalStorage();