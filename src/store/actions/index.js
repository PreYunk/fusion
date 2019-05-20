export {
    changeChapterName,
    changeClass,
    changeMarks,
    changeType,
    changeEditorState,
    changeSubject,
    resetState,
    changeQuestionEditStatus,
    changeAddType,
    getTypes
} from './addQuestion';

export {
    setPaperClass,
    setPaperSubject,
    setPaperTime,
    setPaperMM,
    setPaperTerm,
    setSectionNumbers,
    addToSelectedQuestions,
    setSelectedSection,
    resetSelectedQuestions
} from './generatePaper';

export {
    setFetchedQuestions,
    setSelectedChapter,
    setSelectedType,
    setGroupedQuestions,
    resetGroupedQuestions,
} from './selectQuesitons';