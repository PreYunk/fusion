import * as actionTypes from './actionTypes';

export const changeChapterName = (value) => {
  return {
      type: actionTypes.CHANGE_CHAPTER_NAME,
      value: value
  }
};

export const changeMarks = (value) => {
    return {
        type: actionTypes.CHANGE_MARKS,
        value: value
    }
};

export const changeType = (value) => {
    return {
        type: actionTypes.CHANGE_TYPE,
        value: value
    }
};

export const changeClass = (value) => {
    return {
        type: actionTypes.CHANGE_CLASS,
        value: value
    }
};

export const changeEditorState= (value) => {
    return {
        type: actionTypes.CHANGE_EDITOR_STATE,
        value: value
    }
};

export const changeSubject = (value) => {
    return {
        type: actionTypes.CHANGE_SUBJECT,
        value: value
    }
};

export const resetState = () => {
    return{
        type: actionTypes.RESET_STATE
    }
};