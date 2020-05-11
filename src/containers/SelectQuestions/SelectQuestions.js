import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Context } from "react-mathjax2";
import { parseQuestion } from "../GeneratedPage/GeneratedPage";
import Editor2, {
  renderStateToEditorState,
  editorStateToRenderState,
} from "../../components/Editor2/Editor2";

import classes from "./SelectQuestions.css";
import viewQuestionClasses from "../ViewQuestion/ViewQuestion.css";
import ComboBox from "../../components/ComboBox/ComboBox";
import List from "../../components/List/List";
import MaterialFab from "../../components/MaterialComponents/MaterialFab/MaterialFab";
import ExpandableComponents from "../../components/ExpandableComponents/ExpandableComponents";
import Label from "../../components/Label/Label";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { withRouter } from "react-router-dom";
import Button from "../../components/Button/Button";

class SelectQuestions extends Component {
  componentWillMount() {
    this.setState({
      marksLeft: this.props.paperMM,
    });
  }

  state = {
    typeSelectedIndex: -1,
    chapterSelectedIndex: -1,
    previewDialogOpen: false,
    previewEditorState: undefined,
    marksLeft: 0,
  };

  resetFilterButtonClickHandler = () => {
    this.setState({ typeSelectedIndex: -1, chapterSelectedIndex: -1 });
  };

  editorStateChangeHandler = (editorState) => {
    this.setState({ previewEditorState: editorState });
  };
  previewAlertDialogButtonClickHandler = () => {
    this.setState({ previewDialogOpen: false });
  };

  typeListClickHandler = (event, label, index) => {
    this.setState({ typeSelectedIndex: index });
    this.props.setSelectedType(label);
  };

  chapterListClickHandler = (event, label, index) => {
    this.setState({ chapterSelectedIndex: index });
    this.props.setSelectedChapter(parseInt(label[label.length - 1]));
  };

  generateButtonClickHandler = () => {
    const groupedQuestions = this.props.selectedQuestions.reduce(
      (group, question) => {
        group[question.section] =
          group[question.section] || Object.create(null);
        let questionType = question.type;
        group[question.section][questionType] =
          group[question.section][questionType] || [];
        group[question.section][questionType].push(question.question);
        return group;
      },
      Object.create(null)
    );
    this.props.setGroupedQuestions(groupedQuestions);
    this.props.history.push("/gen");
  };

  previewButtonClickHandler = (editorState) => {
    const prevEditorState = editorStateToRenderState(editorState);
    console.log(prevEditorState);
    this.setState({
      previewEditorState: prevEditorState,
      previewDialogOpen: true,
    });
  };
  addButtonClickHandler = (question) => {
    const addedQuestion = {
      type: question.type,
      section: this.props.selectedSection,
      question: question,
    };
    this.setState((prevState) => ({
      marksLeft: prevState.marksLeft - question.marks,
    }));
    this.removeQuestionFromFetchedQuestions(question);
    this.props.addToSelectedQuestions(addedQuestion);
  };

  removeQuestionFromFetchedQuestions = (question) => {
    const questions = this.props.fetchedQuestions;
    const updatedQuestions = questions.filter((que) => {
      return que._id !== question._id;
    });
    this.props.setFetchedQuestions(updatedQuestions);
  };

  render() {
    //display all fetched questions at first
    let questionsArray = [];
    if (
      this.state.chapterSelectedIndex >= 0 &&
      this.state.typeSelectedIndex >= 0
    ) {
      questionsArray = this.props.fetchedQuestions.filter((question) => {
        console.log(
          (question.chapterName ===
            this.props.selectedChapter + " " + question.type) ===
            this.props.selectedType
        );
        return (
          question.chapterName === this.props.selectedChapter &&
          question.type === this.props.selectedType
        );
      });
    } else if (this.state.typeSelectedIndex >= 0) {
      questionsArray = this.props.fetchedQuestions.filter((question) => {
        return question.type === this.props.selectedType;
      });
    } else if (this.state.chapterSelectedIndex >= 0) {
      questionsArray = this.props.fetchedQuestions.filter((question) => {
        return question.chapterName === this.props.selectedChapter;
      });
    } else questionsArray = this.props.fetchedQuestions;
    //generated data acceptable by expandable components
    let expandableComponentsData;
    if (questionsArray.length) {
      expandableComponentsData = questionsArray.map((question) => {
        const questionDetails = (
          <div className={viewQuestionClasses.QuestionDetailsDiv}>
            <ul className={viewQuestionClasses.QuestionDetails}>
              <li className={viewQuestionClasses.QuestionDetail}>
                Subject: {question.subject}
              </li>
              <li className={viewQuestionClasses.QuestionDetail}>
                Class: {question.cls}
              </li>
              <li className={viewQuestionClasses.QuestionDetail}>
                Type: {question.type}
              </li>
              <li className={viewQuestionClasses.QuestionDetail}>
                Marks: {question.marks}
              </li>
              <li className={viewQuestionClasses.QuestionDetail}>
                CreatedBy: {question.user.username}
              </li>
            </ul>
          </div>
        );
        const editorState = renderStateToEditorState(
          JSON.parse(question.questionData)
        );
        const expandableActions = (
          <div className={viewQuestionClasses.ExpandableActions}>
            <Button onClick={() => this.previewButtonClickHandler(editorState)}>
              Preview
            </Button>
            <Button onClick={() => this.addButtonClickHandler(question)}>
              Add
            </Button>
          </div>
        );
        let rawQue = editorState;
        if (rawQue.length >= 50) rawQue = rawQue.slice(0, 51);
        const expSummaryComponent = (
          <div className={viewQuestionClasses.SummaryComponents}>
            <span className={viewQuestionClasses.SummaryComponent}>
              {rawQue}
            </span>
            <span className={viewQuestionClasses.SummaryComponent}>
              Chapter Number {question.chapterName}
            </span>
            <span className={viewQuestionClasses.SummaryComponent}>
              {question.cls}
            </span>
            <span className={viewQuestionClasses.SummaryComponent}>
              {question.subject}
            </span>
          </div>
        );
        return {
          summary: "",
          summaryComponent: expSummaryComponent,
          detail: questionDetails,
          actions: expandableActions,
        };
      });
    }

    //compute lists data from raw
    const fetchedTypesArray = this.props.fetchedQuestions.map((item) => {
      return item.type;
    });
    const fetchedTypes = [...new Set(fetchedTypesArray)];
    const typeListData = fetchedTypes.map((item, index) => {
      return {
        key: index,
        selected: this.state.typeSelectedIndex === index,
        onClick: (event, label, index) =>
          this.typeListClickHandler(event, label, index),
        label: item,
      };
    });

    const fetchedChaptersArray = this.props.fetchedQuestions.map((item) => {
      return item.chapterName;
    });
    const fetchedChapters = [...new Set(fetchedChaptersArray)];
    const chaptersListData = fetchedChapters.map((item, index) => {
      return {
        key: index,
        selected: this.state.chapterSelectedIndex === index,
        onClick: (event, label, index) =>
          this.chapterListClickHandler(event, label, index),
        label: "Chapter " + item,
      };
    });
    const asciiForA = 65;
    const array = [];
    array.length = this.props.sectionNumbers;
    array.fill(1);
    const sectionData = array.map((x, i) => {
      return {
        value: "Section - " + String(String.fromCharCode(asciiForA + i)),
        label: "Section - " + String(String.fromCharCode(asciiForA + i)),
      };
    });
    return (
      <div className={classes.SelectQuestions}>
        <div className={classes.QuestionSelectionArea}>
          <div className={classes.ExpandableComponent}>
            {questionsArray.length ? (
              <ExpandableComponents
                expandableComponentsData={expandableComponentsData}
              />
            ) : (
              <div
                style={{
                  width: "70%",
                  textAlign: "center",
                  marginTop: "100px",
                }}
              >
                <span
                  style={{
                    color: "#313131",
                    fontSize: "50px",
                  }}
                >
                  NO QUESTIONS FOUND
                </span>
              </div>
            )}
          </div>
          <div className={classes.RelativeWrapper}>
            <div className={classes.QuestionSelectionControls}>
              <div
                style={{
                  margin: "40px 10px",
                  display: "flex",
                  flexFlow: "row",
                  alignItems: "center",
                }}
              >
                <span className={classes.Label}>Section:</span>
                <ComboBox
                  value={this.props.selectedSection}
                  onChange={(event) =>
                    this.props.setSelectedSection(event.target.value)
                  }
                  data={sectionData}
                />
              </div>
              <div
                style={{
                  marginBottom: "30px",
                }}
              >
                <span className={classes.Label}>MARKS LEFT:</span>
                <span className={classes.Label} id={classes.MarksLeft}>
                  {this.state.marksLeft}
                </span>
              </div>

              <List smallList listData={typeListData} header="Types:" />
              <List smallList listData={chaptersListData} header="Chapters:" />
              <Button onClick={this.resetFilterButtonClickHandler}>
                Reset Filter
              </Button>
              <Button onClick={this.generateButtonClickHandler}>
                Generate
              </Button>
            </div>
          </div>
        </div>
        <AlertDialog
          fullScreen={true}
          isOpen={this.state.previewDialogOpen}
          dialogTitle="Preview Question"
          onClickButton={this.previewAlertDialogButtonClickHandler}
          buttonText="Close"
          dialogContentText=" "
          dialogContentComponent={
            <Context input="tex">
              <div style={{ width: "100%", height: "80vh" }}>
                {this.state.previewEditorState
                  ? parseQuestion(this.state.previewEditorState)
                  : null}
              </div>
            </Context>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sectionNumbers: state.generatePaperReducer.sectionNumbers,
    selectedSection: state.generatePaperReducer.selectedSection,
    fetchedQuestions: state.selectQuestionsReducer.fetchedQuestions,
    selectedChapter: state.selectQuestionsReducer.selectedChapter,
    selectedType: state.selectQuestionsReducer.selectedType,
    selectedQuestions: state.generatePaperReducer.selectedQuestions,
    paperMM: state.generatePaperReducer.paperMM,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedSection: (value) => dispatch(actions.setSelectedSection(value)),
    setSelectedChapter: (value) => dispatch(actions.setSelectedChapter(value)),
    setSelectedType: (value) => dispatch(actions.setSelectedType(value)),
    addToSelectedQuestions: (value) =>
      dispatch(actions.addToSelectedQuestions(value)),
    setFetchedQuestions: (value) =>
      dispatch(actions.setFetchedQuestions(value)),
    setGroupedQuestions: (value) =>
      dispatch(actions.setGroupedQuestions(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SelectQuestions));
