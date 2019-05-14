import * as actionTypes from '../actions/actionTypes';
import {EditorState} from 'draft-js';

const initialState = {
  chapterName: '',
  class: 1,
  marks: 1,
  type: '',
    editorState: EditorState.createEmpty(),
    subject: ''
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
        case actionTypes.CHANGE_EDITOR_STATE:
            return  {
                ...state,
                editorState: action.value
            };
        case actionTypes.CHANGE_SUBJECT:
            return  {
                ...state,
                subject: action.value
            };
        case actionTypes.RESET_STATE:
            return {
              ...initialState
            };
        default:
            return state;
    }
};

export default reducer;