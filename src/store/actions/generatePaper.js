import * as actionTypes from './actionTypes';

export const setPaperClass = (value) => {
    return {
        type: actionTypes.SET_PAPER_CLASS,
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

