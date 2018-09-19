import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    accessToken: localStorage.getItem("accessToken"),
    loading: false,
    loginError: null,
    registerError: null,
};

const authStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        accessToken: action.accessToken,
        tokenType: action.tokenType,
        loading: false,
        loginError: null,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        loginError: true,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        accessToken: null,
        tokenType: null,
    });
};

const registerStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        registerError: false,
        loading: false
    });
};

const registerFail = (state, action) => {
    return updateObject(state, {
        registerError: true,
        loading: false
    });
};

const resetLoginError = (state, action) => {
    return updateObject(state, {
        loginError: null
    });
};

const resetRegisterError = (state, action) => {
    return updateObject(state, {
        registerError: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.RESET_LOGIN_ERROR: return resetLoginError(state, action);
        case actionTypes.RESET_REGISTER_ERROR: return resetRegisterError(state, action);
        default:
            return state;
    }
};

export default reducer;