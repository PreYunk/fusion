import * as actionTypes from './actionTypes';

export const setUsername = (value) => {
    return {
        type: actionTypes.SET_USERNAME,
        value: value
    }
};
export const setPassword = (value) => {
    return {
        type: actionTypes.SET_PASSWORD,
        value: value
    }
};

export const setActiveUser = (value) => {
    return {
        type: actionTypes.SET_ACTIVE_USER,
        value: value
    }
};
export const setLoginMode = (value) => {
    return {
        type: actionTypes.SET_LOGIN_MODE,
        value: value
    }
};
export const setConfirmPassword = (value) => {
    return {
        type: actionTypes.SET_CONFIRM_PASSWORD,
        value: value
    }
};