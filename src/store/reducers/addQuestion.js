import * as actionTypes from '../actions/actionTypes';

const initialState = {
  chapterName: '',
  class: 1,
  marks: 1,
  type: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CHAPTER_NAME:
            return {
                ...state,
                chapterName: action.value
            };
        case actionTypes.CHANGE_CLASS:
            return {
                ...state,
                class: action.value
            };
        case actionTypes.CHANGE_MARKS:
            return {
                ...state,
                marks: action.value
            };
        case actionTypes.CHANGE_TYPE:
            return {
                ...state,
                type: action.value
            };
        default:
            return state;
    }
};

export default reducer;