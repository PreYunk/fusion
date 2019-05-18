import * as actionTypes from '../actions/actionTypes';

const initialState = {
  paperClass: '',
  paperSubject: '',
  paperTime: '',
  paperMM: 0,
  paperTerm: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAPER_CLASS:
            return {
                ...state,
                paperClass: action.value
            };
        case actionTypes.SET_PAPER_SUBJECT:
            return {
                ...state,
                paperSubject: action.value
            };
        case actionTypes.SET_PAPER_TIME:
            return {
                ...state,
                paperTime: action.value
            };
        case actionTypes.SET_PAPER_MM:
            return {
                ...state,
                paperMM: action.value
            };
        case actionTypes.SET_PAPER_TERM:
            return {
                ...state,
                paperTerm: action.value
            };
        default:
            return {...state};
    }
};

export default reducer;