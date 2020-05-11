import * as actionTypes from "../actions/actionTypes";
import { EditorState } from "draft-js";

const initialState = {
  chapterName: 0,
  class: "",
  marks: 1,
  type: "",
  editorState: "",
  subject: "",
  questionEditStatus: false,
  questionEditId: "",
  types: null,
  addType: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CHAPTER_NAME:
      return {
        ...state,
        chapterName: action.value,
      };
    case actionTypes.CHANGE_CLASS:
      return {
        ...state,
        class: action.value,
      };
    case actionTypes.CHANGE_MARKS:
      return {
        ...state,
        marks: action.value,
      };
    case actionTypes.CHANGE_TYPE:
      return {
        ...state,
        type: action.value,
      };
    case actionTypes.CHANGE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.value,
      };
    case actionTypes.CHANGE_SUBJECT:
      return {
        ...state,
        subject: action.value,
      };
    case actionTypes.RESET_STATE:
      return {
        ...initialState,
      };
    case actionTypes.CHANGE_QUESTION_EDIT_STATUS:
      return {
        ...state,
        questionEditStatus: action.value,
        questionEditId: action.questionId,
      };
    case actionTypes.CHANGE_ADD_TYPE:
      return {
        ...state,
        addType: action.value,
      };
    case actionTypes.GET_TYPES:
      return {
        ...state,
        types: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
