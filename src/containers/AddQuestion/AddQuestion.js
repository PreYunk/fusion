import React, { Component } from "react";
import { connect } from "react-redux";
import { Editor } from "draft-js";
import { convertToRaw, RichUtils } from "draft-js";
import "../../assets/css/react-draft-wysiwyg.css";
import axios from "axios";
// import MathQuill , {addStyles as addMathquillStyles} from 'react-mathquill';

import ComboBox from "../../components/ComboBox/ComboBox";
import Label from "../../components/Label/Label";
import FormComponent from "../../components/FormComponent/FormComponent";
import Input from "../../components/Input/Input";
import RowGroupedThree from "../../components/RowGroupedThree/RowGroupedThree";
import FilledButton from "../../components/FilledButton/FilledButton";
import AlertDialogBox from "../../components/AlertDialog/AlertDialog";
import MaterialFab from "../../components/MaterialComponents/MaterialFab/MaterialFab";
import AddTypeDialog from "../../components/Specifics/AddTypeDialog/AddTypeDialog";
import Editor2, {
  editorStateToRenderState,
} from "../../components/Editor2/Editor2";
import Button from "../../components/Button/Button";

import classes from "./AddQuestion.css";
import * as actions from "../../store/actions/index";
import { MetroSpinner } from "react-spinners-kit";
import LoadingOverlay from "react-loading-overlay";
import { withRouter } from "react-router-dom";

// addMathquillStyles();

class AddQuestion extends Component {
  componentDidMount() {
    this.props.getTypes();
  }

  state = {
    alertDialogOpen: false,
    alertDialogMsg: "Question Added Successfully",
    addTypeDialogOpen: false,
    loading: false,
    accessDeniedAlert: false,
    configOpened: false,
  };

  handleReturn = (event) => {
    this.props.onEditorStateChange(
      RichUtils.insertSoftNewline(this.props.editorState)
    );
    return "handled";
  };

  onClickAddTypeHandler = () => {
    if (this.props.activeUser.permissions.addQuestion)
      this.setState({ addTypeDialogOpen: true });
    else this.setState({ accessDeniedAlert: true });
  };
  onAddTypeDialogClose = () => {
    this.setState({ addTypeDialogOpen: false });
  };
  onClickAddTypeSubmitHandler = () => {
    if (this.props.activeUser.permissions.addQuestion) {
      axios
        .post("/addType", { name: this.props.addType })
        .then((result) => {
          this.setState({ addTypeDialogOpen: false });
          this.props.getTypes();
          console.log(result);
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ accessDeniedAlert: true });
    }
  };

  onChangeAddTypeInputHandler = (event) => {
    this.props.onAddTypeChange(event.target.value);
  };

  chapterNameChangedHandler = (event) => {
    console.log(event.target.value);
    this.props.onChapterNameChange(event.target.value);
  };

  cancelButtonClicked = () => {
    this.props.resetState();
    this.props.history.goBack();
  };

  submitButtonClicked = () => {
    console.log(editorStateToRenderState(this.props.editorState));
    const questionRawData = JSON.stringify(
      editorStateToRenderState(this.props.editorState)
    );
    const dataToBeExported = {
      id: Math.floor(Math.random() * 1000),
      cls: this.props.cls,
      subject: this.props.sub,
      type: this.props.type,
      marks: this.props.marks,
      chapterName: this.props.chName,
      questionData: questionRawData,
    };
    if (this.props.questionEditStatus) {
      this.setState({ loading: true });
      axios
        .post("/updateQuestion", {
          query: this.props.questionEditId,
          update: { ...dataToBeExported },
        })
        .then((result) => {
          this.setState({
            alertDialogOpen: true,
            alertDialogMsg: "Question Updated Successfully",
          });
          this.props.resetState();
          console.log(result);
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (this.props.activeUser.permissions.addQuestion) {
        this.setState({ loading: true });
        dataToBeExported.user = this.props.activeUser.userId;
        // axios.post('https://polar-sea-14304.herokuapp.com/api/addQuestion', dataToBeExported)
        axios
          .post("/addQuestion", dataToBeExported)
          .then((result) => {
            this.setState({
              alertDialogOpen: true,
              alertDialogMsg: "Question Added Successfully",
            });
            this.props.resetState();
            console.log(result);
            this.setState({ loading: false });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.props.resetState();
        this.setState({ accessDeniedAlert: true });
      }
    }
  };

  alertDialogBoxCloseHandler = () => {
    this.setState({ alertDialogOpen: false });
    this.props.history.goBack();
  };

  onTypeChangeHandler = (event) => {
    this.props.onTypeChange(event.target.value);
  };

  configClicked = (event) => {
    this.setState((state) => ({ configOpened: !state.configOpened }));
  };

  render() {
    const typeData =
      this.props.types !== null
        ? this.props.types.map((type) => {
            return { value: type.name, label: type.name };
          })
        : [{ value: "Add Some Types", label: "Add Some Types" }];

    const marksData = [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
      { value: 6, label: "6" },
      { value: 7, label: "7" },
      { value: 8, label: "8" },
      { value: 9, label: "9" },
      { value: 10, label: "10" },
    ];
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
      { value: "Hindi", label: "Hindi" },
      { value: "Maths", label: "Maths" },
      { value: "Science", label: "Science" },
      { value: "SST", label: "SST" },
      { value: "Sanskrit", label: "Sanskrit" },
      { value: "Computer Science", label: "Computer Science" },
      { value: "IP", label: "IP" },
      { value: "GK", label: "GK" },
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Biology", label: "Biology" },
      { value: "Physical Education", label: "Physical Education" },
      { value: "Business Studies", label: "Business Studies" },
      { value: "Accountancy", label: "Accountancy" },
      { value: "Economics", label: "Economics" },
      { value: "History & Civics", label: "History & Civics" },
      { value: "Geography", label: "Geography" },
    ];

    const marksLabel = <Label text="Marks:" />;
    const marksComboBox = (
      <ComboBox
        value={this.props.marks}
        data={marksData}
        onChange={(event) => this.props.onMarksChange(event.target.value)}
        mobile={this.props.mobile}
      />
    );
    const idLabel = <Label text="Question id:" />;
    const idValue = <Label text="2" />;
    const chapterNameLabel = <Label text="Chapter Number:" />;
    const chapterNameInput = (
      <Input
        onChange={this.chapterNameChangedHandler}
        label="Chapter Name"
        id="ch-name-id"
        name="ch-name-name"
        value={this.props.chName}
        placeholder="Chapter Number"
        type="number"
        mobile={this.props.mobile}
      />
    );
    const classLabel = <Label text="Class: " />;
    const classComboBox = (
      <ComboBox
        value={this.props.cls}
        data={classData}
        onChange={(event) => this.props.onClassChange(event.target.value)}
        mobile={this.props.mobile}
      />
    );
    const subjectLabel = <Label text="Subject" />;
    const subjectComboBox = (
      <ComboBox
        value={this.props.sub}
        data={subjectData}
        onChange={(event) => this.props.onSubjectChange(event.target.value)}
        mobile={this.props.mobile}
      />
    );
    const typeLabel = <Label text="Type: " />;
    const typeComboBox = (
      <ComboBox
        value={this.props.type}
        data={typeData}
        onChange={(event) => this.onTypeChangeHandler(event)}
        mobile={this.props.mobile}
      />
    );
    const cancelButton = (
      <FilledButton
        text="Cancel"
        buttonType="red"
        buttonClicked={this.cancelButtonClicked}
      />
    );
    const previewButton = <FilledButton text="Preview" buttonType="default" />;
    const submitButton = (
      <FilledButton
        text="Submit"
        buttonType="default"
        buttonClicked={this.submitButtonClicked}
      />
    );
    const addQuestionLabel = <Label text="Question :" />;

    // const latex = '\\frac{1}{\\sqrt{2}}\\cdot 2';
    return this.state.loading ? (
      <div style={{ position: "absolute", top: "40vh", left: "45vw" }}>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<MetroSpinner size={100} sizeUnit="px" color="#52E5AA" />}
          text={<span style={{ color: "#313131" }}>LOADING...</span>}
        />
      </div>
    ) : (
      <div className={classes.AddQuestion}>
        {this.props.mobile ? (
          <div className={classes.ConfigBtn}>
            <Button text="Config" onButtonClicked={this.configClicked} />
          </div>
        ) : (
          <>
            <FormComponent
              labelComponent={classLabel}
              inputComponent={classComboBox}
            />
            <FormComponent
              labelComponent={subjectLabel}
              inputComponent={subjectComboBox}
            />
            <FormComponent
              labelComponent={chapterNameLabel}
              inputComponent={chapterNameInput}
            />
            <div className={classes.TypeComponents}>
              <FormComponent
                labelComponent={typeLabel}
                inputComponent={typeComboBox}
              />
              <MaterialFab onClick={this.onClickAddTypeHandler}>
                Add
              </MaterialFab>
            </div>
            <AddTypeDialog
              isOpen={this.state.addTypeDialogOpen}
              onClose={this.onAddTypeDialogClose}
              addTypeInputChanged={this.onChangeAddTypeInputHandler}
              addTypeInputValue={this.props.addType}
              buttonClicked={this.onClickAddTypeSubmitHandler}
            />
            <FormComponent
              labelComponent={marksLabel}
              inputComponent={marksComboBox}
            />
            <FormComponent
              labelComponent={addQuestionLabel}
              inputComponent={null}
            />
          </>
        )}
        {this.state.configOpened ? (
          <div className={classes.ConfigPanel}>
            <>
              <FormComponent
                labelComponent={classLabel}
                inputComponent={classComboBox}
              />
              <FormComponent
                labelComponent={subjectLabel}
                inputComponent={subjectComboBox}
              />
              <FormComponent
                labelComponent={chapterNameLabel}
                inputComponent={chapterNameInput}
              />
              <div className={classes.TypeComponents}>
                <FormComponent
                  labelComponent={typeLabel}
                  inputComponent={typeComboBox}
                />
                <Button
                  text="Add Type"
                  onButtonClicked={this.onClickAddTypeHandler}
                />
              </div>
              <AddTypeDialog
                isOpen={this.state.addTypeDialogOpen}
                onClose={this.onAddTypeDialogClose}
                addTypeInputChanged={this.onChangeAddTypeInputHandler}
                addTypeInputValue={this.props.addType}
                buttonClicked={this.onClickAddTypeSubmitHandler}
              />
              <FormComponent
                labelComponent={marksLabel}
                inputComponent={marksComboBox}
              />
              <FormComponent
                labelComponent={addQuestionLabel}
                inputComponent={null}
              />
            </>
          </div>
        ) : null}
        <Editor2
          editStatus={this.props.questionEditStatus}
          handleReturn={this.handleReturn}
          editorState={this.props.editorState}
          width="90%"
          height="200px"
          // wrapperClassName={classes.EditorWrapper}
          // editorClassName={classes.Editor}
          onChange={(editorState) =>
            this.props.onEditorStateChange(editorState)
          }
        />
        {/*could be used to render mathematical expressions in future*/}
        {/*<MathQuill latex={latex}/>*/}
        <RowGroupedThree
          firstComp={cancelButton}
          secondComp={previewButton}
          thirdComp={submitButton}
        />
        <AlertDialogBox
          fullScreen={false}
          isOpen={this.state.alertDialogOpen}
          onClose={this.alertDialogBoxCloseHandler}
          dialogTitle={"Success"}
          dialogContentText={this.state.alertDialogMsg}
          buttonText="OK"
          onClickButton={this.alertDialogBoxCloseHandler}
        />
        <AlertDialogBox
          fullScreen={false}
          isOpen={this.state.accessDeniedAlert}
          onClose={() => this.setState({ accessDeniedAlert: false })}
          dialogTitle={"Access Denied"}
          dialogContentText="You don't have enough permissions"
          buttonText="Accept"
          onClickButton={() => this.setState({ accessDeniedAlert: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chName: state.addQuestionReducer.chapterName,
    cls: state.addQuestionReducer.class,
    marks: state.addQuestionReducer.marks,
    type: state.addQuestionReducer.type,
    editorState: state.addQuestionReducer.editorState,
    sub: state.addQuestionReducer.subject,
    questionEditStatus: state.addQuestionReducer.questionEditStatus,
    questionEditId: state.addQuestionReducer.questionEditId,
    addType: state.addQuestionReducer.addType,
    types: state.addQuestionReducer.types,
    activeUser: state.loginReducer.activeUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChapterNameChange: (value) => dispatch(actions.changeChapterName(value)),
    onClassChange: (value) => dispatch(actions.changeClass(value)),
    onMarksChange: (value) => dispatch(actions.changeMarks(value)),
    onTypeChange: (value) => dispatch(actions.changeType(value)),
    onSubjectChange: (value) => dispatch(actions.changeSubject(value)),
    onEditorStateChange: (value) => dispatch(actions.changeEditorState(value)),
    resetState: () => dispatch(actions.resetState()),
    onAddTypeChange: (value) => dispatch(actions.changeAddType(value)),
    getTypes: () => dispatch(actions.getTypes()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddQuestion));
