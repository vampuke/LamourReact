import { USER } from './actionTypes';

export const user = userInfo => ({
    type: USER,
    payload: {
        userInfo
    }
})