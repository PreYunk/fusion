import * as actionTypes from './actionTypes';

export const setPaperClass = (label, value) => {
    return {
        type: actionTypes.SET_PAPER_CLASS,
        label: label,
        value: value
    }
};

export const setPaperSubject = (value) => {
    return {
        type: actionTypes.SET_PAPER_SUBJECT,
        value: value
    }
};

export const setPaperTime = (value) => {
    return {
        type: actionTypes.SET_PAPER_TIME,
        value: value
    }
};

export const setPaperMM = (value) => {
    return {
        type: actionTypes.SET_PAPER_MM,
        value: value
    }
};

export const setPaperTerm = (value) => {
    return {
        type: actionTypes.SET_PAPER_TERM,
        value: value
    }
};

export const setSectionNumbers = (value) => {
    return {
        type: actionTypes.SET_SECTION_NUMBERS,
        value: value
    }
};

export const addToSelectedQuestions = (value) => {
    return {
        type: actionTypes.ADD_TO_SELECTED_QUESTIONS,
        value: value
    }
};

export const setSelectedSection = (value) => {
    return {
        type: actionTypes.SET_SELECTED_SECTION,
        value: value
    }
};


