import * as actionTypes from '../actions/actionTypes';

const initialState = {
    paperClass: '',
    paperClassValue: 0,
    paperSubject: '',
    paperTime: '',
    paperMM: 0,
    paperTerm: '',
    sectionNumbers: 0,
    selectedQuestions: [],
    selectedSection: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAPER_CLASS:
            return {
                ...state,
                paperClass: action.label,
                paperClassValue: action.value
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
        case actionTypes.SET_SECTION_NUMBERS:
            return  {
                ...state,
                sectionNumbers: action.value
            };
        case actionTypes.ADD_TO_SELECTED_QUESTIONS:
            const updatedSelectedQuestions = [...state.selectedQuestions];
            updatedSelectedQuestions.push(action.value);
            return {
                ...state,
                selectedQuestions: updatedSelectedQuestions
            };
        case actionTypes.SET_SELECTED_SECTION:
            return {
                ...state,
                selectedSection: action.value
            };
        default:
            return {...state};
    }
};

export default reducer;