import * as actionTypes from '../actions/actionTypes';


//this initial state is also set on StartPage.js
const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    activeUser: {
        permissions: {
            createUser: false,
            addQuestion: false,
            updateQuestion: false,
            generateQuestion: false
        },
        username: ' '
    },
    loginMode: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERNAME:
            return {
                ...state,
                username: action.value
            };
        case actionTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.value
            };
        case actionTypes.SET_ACTIVE_USER:
            return {
                ...state,
                activeUser: {
                    userId: action.value.userId,
                    username: action.value.username,
                    permissions: {
                        ...action.value.permissions
                    }
                }
            };
        case actionTypes.SET_LOGIN_MODE:
            return {
                ...state,
                loginMode: action.value
            };
        case actionTypes.SET_CONFIRM_PASSWORD:
            return {
                ...state,
                confirmPassword: action.value
            };
        default:
            return state
    }
};

export default reducer;