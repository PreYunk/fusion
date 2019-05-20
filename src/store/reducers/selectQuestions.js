import * as actionTypes from '../actions/actionTypes';

const initialState = {
  fetchedQuestions: [],
    selectedType: '',
    selectedChapter: 0,
    groupedQuestions: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.SET_FETCHED_QUESTIONS:
          return {
              ...state,
              fetchedQuestions: action.value
          };
      case actionTypes.SET_SELECTED_TYPE:
          return {
              ...state,
                selectedType: action.value
          };
      case actionTypes.SET_SELECTED_CHAPTER:
          return {
              ...state,
              selectedChapter: action.value
          };
      case actionTypes.SET_GROUPED_QUESTIONS:
          return {
              ...state,
              groupedQuestions: action.value
          };
      case actionTypes.RESET_GROUPED_QUESTIONS:
          return {
              ...state,
              groupedQuestions: null
          };
      default:
          return state
  }
};

export default reducer;