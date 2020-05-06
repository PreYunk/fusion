import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Context, Node } from "react-mathjax2";
import ExpandableComponents from "../../components/ExpandableComponents/ExpandableComponents";
import classes from "./ViewQuestion.css";
import FormDialog from "../../components/FormDialog/FormDialog";
import FilterFormComponent from "../../components/Specifics/FilterFormComponents/FilterFormComponents";
import { convertFromRaw } from "draft-js";
import { EditorState } from "draft-js";
import MaterialFab from "../../components/MaterialComponents/MaterialFab/MaterialFab";
import FilledButton from "../../components/FilledButton/FilledButton";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { MetroSpinner } from "react-spinners-kit";
import LoadingOverlay from "react-loading-overlay";
import { Editor } from "react-draft-wysiwyg";
import Editor2, {
  renderStateToEditorState,
} from "../../components/Editor2/Editor2";
import { parseQuestion } from "../GeneratedPage/GeneratedPage";

import axios from "axios";
import * as actions from "../../store/actions/index";

class ViewQuestion extends Component {
  state = {
    deleteDialogBoxOpen: false,
    formDialogBoxOpen: false,
    subjectFilter: "",
    classFilter: "",
    subjectFilterEnabled: false,
    classFilterEnabled: false,
    questionDataFetched: [],
    subjectsFetched: [],
    classesFetched: [],
    expandableComponentsData: [],
    previewOpen: false,
    previewEditorState: "",
    loading: false,
    updateQuestionAccess: false,
    updateQuestionDeniedAlert: false,
  };

  // componentDidMount() {
  //   this.setState({
  //     updateQuestionAccess: this.props.activeUser.permissions.updateQuestion,
  //   });
  //   console.log(this.props.activeUser.permissions.updateQuestion);
  // }

  onEditorStateChangeHandler = (editorState) => {
    this.setState({ previewEditorState: editorState });
  };
  previewButtonClickHandler = (editorState) => {
    const prevEditorState = editorState;
    this.setState({ previewEditorState: prevEditorState, previewOpen: true });
  };
  deleteButtonClickHandler = (questionId, user) => {
    console.log(this.state.updateQuestionAccess);
    console.log("Question Added by  " + user._id);
    console.log("Active User " + this.props.activeUser.userId);
    console.log(user._id === this.props.activeUser.userId);
    if (
      this.state.updateQuestionAccess ||
      user._id === this.props.activeUser.userId
    ) {
      this.setState({ loading: true });
      axios
        .delete("/deleteQuestion", { data: { id: questionId } })
        .then((result) => {
          this.setState({ deleteDialogBoxOpen: true });
          console.log(result);
          this.setState({ loading: false });
        })
        .catch((err) => console.log(err));
    } else this.setState({ updateQuestionDeniedAlert: true });
  };

  editButtonClickHandler = (questionEditData) => {
    console.log(questionEditData._id);
    console.log(this.state.updateQuestionAccess);
    console.log("Question Added by  " + questionEditData.user._id);
    console.log("Active User " + this.props.activeUser.userId);
    console.log(questionEditData.user._id === this.props.activeUser.userId);
    if (
      this.state.updateQuestionAccess ||
      questionEditData.user._id === this.props.activeUser.userId
    ) {
      this.performQuestionEdit(questionEditData);
    } else {
      console.log("exec else");
      this.setState({ updateQuestionDeniedAlert: true });
    }
  };

  performQuestionEdit = (questionEditData) => {
    this.props.setChapterName(questionEditData.chapterName);
    this.props.setClass(questionEditData.cls);
    this.props.setSubject(questionEditData.subject);
    this.props.setType(questionEditData.type);
    this.props.setMarks(questionEditData.marks);
    const contentEditorState = JSON.parse(questionEditData.questionData);

    const editorState = contentEditorState.raw;
    this.props.setEditorState(editorState);
    this.props.setQuestionEditStatus(true, questionEditData._id);
    this.props.history.push("/start/add");
  };

  formAcceptHandler = () => {
    let queryString = "";
    if (this.state.subjectFilterEnabled && this.state.classFilterEnabled)
      queryString =
        "?subject=" +
        this.state.subjectFilter +
        "&class=" +
        this.state.classFilter;
    else if (this.state.subjectFilterEnabled)
      queryString = "?subject=" + this.state.subjectFilter;
    else if (this.state.classFilterEnabled)
      queryString = "?class=" + this.state.classFilter;
    console.log("Form Submitted");
    this.setState({ loading: true });
    axios
      .get("/getQuestions" + queryString)
      // axios.get('https://polar-sea-14304.herokuapp.com/api/getQuestions'+queryString)
      .then((questions) => {
        console.log(queryString);
        this.setState({ questionDataFetched: questions.data.data });
        const expandableQuestions = questions.data.data.map((question) => {
          const questionDetails = (
            <div className={classes.QuestionDetailsDiv}>
              <ul className={classes.QuestionDetails}>
                <li className={classes.QuestionDetail}>
                  Subject: {question.subject}
                </li>
                <li className={classes.QuestionDetail}>
                  Class: {question.cls}
                </li>
                <li className={classes.QuestionDetail}>
                  Type: {question.type}
                </li>
                <li className={classes.QuestionDetail}>
                  Marks: {question.marks}
                </li>
                <li className={classes.QuestionDetail}>
                  CreatedBy: {question.user.username}
                </li>
              </ul>
            </div>
          );

          const renderState = JSON.parse(question.questionData);
          const editorState = renderStateToEditorState(renderState);
          console.log(editorState);
          const expandableActions = (
            <div className={classes.ExpandableActions}>
              <MaterialFab
                onClick={() => this.previewButtonClickHandler(renderState)}
                mobile={this.props.mobile}
              >
                Preview
              </MaterialFab>
              <MaterialFab
                onClick={() => this.editButtonClickHandler(question)}
                mobile={this.props.mobile}
              >
                Edit
              </MaterialFab>
              <MaterialFab
                onClick={() =>
                  this.deleteButtonClickHandler(question._id, question.user)
                }
                mobile={this.props.mobile}
              >
                Delete
              </MaterialFab>
            </div>
          );
          let rawQue = editorState;
          if (rawQue.length >= 50) rawQue = rawQue.slice(0, 51);
          const expSummaryComponent = (
            <div className={classes.SummaryComponents}>
              <span className={classes.SummaryComponent}>{rawQue}</span>
              <span className={classes.SummaryComponent}>
                Ch. No. {question.chapterName}
              </span>
              <span className={classes.SummaryComponent}>
                Class: {question.cls}
              </span>
              <span className={classes.SummaryComponent}>
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
        this.setState({ expandableComponentsData: expandableQuestions });
        this.setState({ formDialogBoxOpen: false });
        console.log(this.state.questionDataFetched);
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
  };

  filterButtonClickHandler = () => {
    this.setState({ formDialogBoxOpen: true });
  };
  handleFormDialogClose = () => {
    console.log("Dialog onClose fired");
    this.setState({ formDialogBoxOpen: false });
  };
  subjectStateChanged = (event) => {
    this.setState({ subjectFilter: event.target.value });
  };
  classStateChanged = (event) => {
    this.setState({ classFilter: event.target.value });
  };
  switchStateChanged = (switchName) => (event) => {
    console.log("Switched");
    if (switchName === "subject")
      this.setState({ subjectFilterEnabled: event.target.checked });
    if (switchName === "class")
      this.setState({ classFilterEnabled: event.target.checked });
  };

  previewAlertDialogSubmitButtonHandler = () => {
    this.setState({ previewOpen: false });
  };

  render() {
    const classData = [
      { value: 1, label: "I" },
      { value: 2, label: "II" },
      { value: 3, label: "III" },
      { value: 4, label: "IV" },
      { value: 5, label: "V" },
      { value: 6, label: "VI" },
      { value: 7, label: "VII" },
      { value: 8, label: "VIII" },
      { value: 9, label: "IX" },
      { value: 10, label: "X" },
      { value: 11, label: "XI" },
      { value: 12, label: "XII" },
    ];

    const subjectData = [
      { value: "English I", label: "English I" },
      { value: "English II", label: "English II" },
      { value: "Maths", label: "Maths" },
      { value: "History & Civics", label: "History & Civics" },
      { value: "SST", label: "SST" },
      { value: "GK", label: "GK" },
      { value: "Computer", label: "Computer" },
      { value: "Hindi", label: "Hindi" },
      { value: "Sanskrit", label: "Sanskrit" },
      { value: "Geography", label: "Geography" },
      { value: "Science", label: "Science" },
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Biology", label: "Biology" },
    ];
    return this.state.loading ? (
      <div style={{ position: "absolute", top: "40vh", left: "45vw" }}>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<MetroSpinner size={100} sizeUnit="px" color="#313131" />}
          text={<span style={{ color: "#313131" }}>LOADING...</span>}
        />
      </div>
    ) : (
      <div className={classes.ViewQuestions}>
        {this.state.expandableComponentsData.length ? (
          <ExpandableComponents
            expandableComponentsData={this.state.expandableComponentsData}
          />
        ) : (
          <h1 className={classes.NoQuestionsHeading}>
            Press Filter to display questions
          </h1>
        )}
        <div className={classes.ViewQuestionsControls}>
          <FilledButton
            buttonType="default"
            text="Filter"
            buttonClicked={this.filterButtonClickHandler}
          />
        </div>
        <AlertDialog
          isOpen={this.state.deleteDialogBoxOpen}
          dialogTitle="Delete Successful"
          onClickButton={() => {
            this.formAcceptHandler();
            this.setState({ deleteDialogBoxOpen: false });
          }}
          buttonText="Continue"
          dialogContentText="Question Deleted Successfully"
        />
        <AlertDialog
          isOpen={this.state.updateQuestionDeniedAlert}
          dialogTitle="Access Denied"
          onClickButton={() => {
            this.setState({ updateQuestionDeniedAlert: false });
          }}
          buttonText="Accept"
          dialogContentText="You dont have enough permissions to update this question"
        />
        <AlertDialog
          fullScreen={true}
          isOpen={this.state.previewOpen}
          dialogTitle="Preview Question"
          onClickButton={this.previewAlertDialogSubmitButtonHandler}
          buttonText="Close"
          dialogContentText=" "
          dialogContentComponent={
            // <Editor2
            //   readOnly
            //   toolbarHidden
            //   editorState={this.state.previewEditorState}
            //   width="100%"
            //   height="80vh"
            //   onChange={(editorState) =>
            //     this.onEditorStateChangeHandler(editorState)
            //   }
            // />
            <Context input="tex">
              <div style={{ width: "100%", height: "80vh" }}>
                {this.state.previewEditorState
                  ? parseQuestion(this.state.previewEditorState)
                  : null}
              </div>
            </Context>
          }
        />
        <FormDialog
          isOpen={this.state.formDialogBoxOpen}
          onClose={this.handleFormDialogClose}
          dialogTitle="Filter"
          dialogContentText="Field not required must be unchecked"
          okButtonText="Done"
          okButtonClicked={this.formAcceptHandler}
          formComponent={
            <FilterFormComponent
              subjectFilterState={this.state.subjectFilter}
              subjectStateChanged={this.subjectStateChanged}
              subjectData={subjectData}
              classData={classData}
              classFilterState={this.state.classFilter}
              classStateChanged={this.classStateChanged}
              switchChangeHandler={(value) => this.switchStateChanged(value)}
              classSwitchChecked={this.state.classFilterEnabled}
              subjectSwitchChecked={this.state.subjectFilterEnabled}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.loginReducer.activeUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChapterName: (value) => dispatch(actions.changeChapterName(value)),
    setClass: (value) => dispatch(actions.changeClass(value)),
    setMarks: (value) => dispatch(actions.changeMarks(value)),
    setType: (value) => dispatch(actions.changeType(value)),
    setSubject: (value) => dispatch(actions.changeSubject(value)),
    setEditorState: (value) => dispatch(actions.changeEditorState(value)),
    setQuestionEditStatus: (value, questionId) =>
      dispatch(actions.changeQuestionEditStatus(value, questionId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewQuestion));
