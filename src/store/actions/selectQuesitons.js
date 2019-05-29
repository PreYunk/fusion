import * as actionTypes from './actionTypes';

export const setFetchedQuestions = (value) => {
    return {
        type: actionTypes.SET_FETCHED_QUESTIONS,
        value: value
    }
};

export const setSelectedType = (value) => {
    return {
        type: actionTypes.SET_SELECTED_TYPE,
        value: value
    }
};

export const setSelectedChapter = (value) => {
    return {
        type: actionTypes.SET_SELECTED_CHAPTER,
        value: value
    }
};

export const setGroupedQuestions = (value) => {
    return {
        type: actionTypes.SET_GROUPED_QUESTIONS,
        value: value
    }
};

export const resetGroupedQuestions = () => {
    return {
        type: actionTypes.RESET_GROUPED_QUESTIONS
    }
};