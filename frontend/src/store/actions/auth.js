import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (accessToken, tokenType, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        accessToken: accessToken,
        tokenType: tokenType,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        loginError: error
    };
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('loggedUser');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            usernameOrEmail: email,
            password: password,
        };
        axios.post('http://localhost:8080/api/auth/signin', data).then(response => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('tokenType', response.data.tokenType);
            localStorage.setItem('loggedUser', data.usernameOrEmail);
            dispatch(authSuccess(response.data.accessToken, response.data.tokenType, data.usernameOrEmail));
        }).catch(error => {
            dispatch(authFail(error.message));
        });
    };
};

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (success, message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        success: success,
        message: message
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        registerError: error
    };
};

export const register = (name, username, email, password) => {
    return dispatch => {
        dispatch(registerStart());
        const data = {
            name: name,
            username: username,
            email: email,
            password: password,
        };
        axios.post('http://localhost:8080/api/auth/signup', data).then(response => {
            dispatch(registerSuccess(response.data.success, response.data.message));
        }).catch(error => {
            dispatch(registerFail(error.message));
        });
    };
};

/*export const displayLoggedUser = () => {
    return dispatch => {
        let url = 'http://localhost:8080/api/user/me';
        axios.get(url, {headers: {'Authorization': localStorage.getItem("tokenType") + ' ' + localStorage.getItem("accessToken")}}).then(response => {
            dispatch(displayLoggedUserStart(response.data.username));
            console.log('should show username');
        }).catch(error => {
            console.log(error);
        })
    }
};*/


export const resetLoginErrorToFalse = () => {
    return {
        type: actionTypes.RESET_LOGIN_ERROR,
        loginError: false
    };
};

export const resetLoginError = () => {
    return dispatch => {
        dispatch(resetLoginErrorToFalse());
    }
};

export const resetRegisterErrorToFalse = () => {
    return {
        type: actionTypes.RESET_REGISTER_ERROR,
        registerError: false
    };
};

export const resetRegisterError = () => {
    return dispatch => {
        dispatch(resetRegisterErrorToFalse());
    }
};