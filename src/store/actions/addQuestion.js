import * as actionTypes from './actionTypes';
import axios from 'axios';

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
export const changeQuestionEditStatus = (value,questionId) => {
    return {
        type: actionTypes.CHANGE_QUESTION_EDIT_STATUS,
        value: value,
        questionId: questionId
    }
};

export const changeAddType = (value) => {
    return {
        type: actionTypes.CHANGE_ADD_TYPE,
        value: value
    }
};

export const saveType = (value) => {
  return {
      type: actionTypes.GET_TYPES,
      value: value
  }
};

export const getTypes = () => {
    return dispatch => {
        axios.get('/getTypes')
            .then(result => {
                console.log(result.data.data);
                dispatch(saveType(result.data.data));
            })
            .catch(err => console.log(err));
    }
};