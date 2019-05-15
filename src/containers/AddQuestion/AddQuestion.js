import React, {Component} from 'react';
import {connect} from "react-redux";
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js';
import '../../assets/css/react-draft-wysiwyg.css';
import axios from 'axios';
// import MathQuill , {addStyles as addMathquillStyles} from 'react-mathquill';


import ComboBox from '../../components/ComboBox/ComboBox';
import Label from  '../../components/Label/Label';
import FormComponent from '../../components/FormComponent/FormComponent';
import Input from '../../components/Input/Input';
import RowGroupedThree from '../../components/RowGroupedThree/RowGroupedThree';
import FilledButton from '../../components/FilledButton/FilledButton';
import AlertDialogBox from '../../components/AlertDialog/AlertDialog';



import classes from './AddQuestion.css';
import * as actions from '../../store/actions/index';

// addMathquillStyles();

class AddQuestion extends Component {

    state = {
      alertDialogOpen: false
    };

    chapterNameChangedHandler = (event) => {
        console.log(event.target.value);
        this.props.onChapterNameChange(event.target.value);
    };

    cancelButtonClicked = () => {
        this.props.history.goBack();
    };

    submitButtonClicked = () => {
        const questionRawData = JSON.stringify(convertToRaw(this.props.editorState.getCurrentContent()));
        const dataToBeExported = {
            id: Math.floor(Math.random()*1000),
            cls: this.props.cls,
            subject: this.props.sub,
            type: this.props.type,
            marks: this.props.marks,
            chapterName: this.props.chName,
            questionData: questionRawData
        };
        axios.post('https://polar-sea-14304.herokuapp.com/api/addQuestion', dataToBeExported)
            .then(result => {
                this.props.resetState();
                this.setState({alertDialogOpen: true});
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })

    };

    alertDialogBoxCloseHandler = () => {
        this.setState({alertDialogOpen: false});
        this.props.history.goBack();
    };

    render() {
        const marksData = [
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
            {value: 4, label: '4'},
            {value: 5, label: '5'},
        ];
        const classData = [
            {value: 1, label: 'I'},
            {value: 2, label: 'II'},
            {value: 3, label: 'III'},
            {value: 4, label: 'IV'},
            {value: 5, label: 'V'},
            {value: 6, label: 'VI'},
            {value: 7, label: 'VII'},
            {value: 8, label: 'VIII'},
            {value: 9, label: 'IX'},
            {value: 10, label: 'X'},
            {value: 11, label: 'XI'},
            {value: 12, label: 'XII'},
        ];
        const typeData = [
            {value: 'Short Answers', label: 'Short Answers'},
            {value: 'Long Answers', label: 'Long Answers'},
            {value: 'One Word', label: 'One Word'},
            {value: 'Fill Up', label: 'Fill Up'},
            {value: 'MCQ', label: 'MCQ'},
            {value: 'Short Notes', label: 'Short Notes'},
        ];
        const subjectData = [
            {value: 'English I', label: 'English I'},
            {value: 'English II', label: 'English II'},
            {value: 'Maths', label: 'Maths'},
            {value: 'History & Civics', label: 'History & Civics'},
            {value: 'SST', label: 'SST'},
            {value: 'GK', label: 'GK'},
            {value: 'Computer', label: 'Computer'},
            {value: 'Hindi', label: 'Hindi'},
            {value: 'Sanskrit', label: 'Sanskrit'},
            {value: 'Geography', label: 'Geography'},
            {value: 'Science', label: 'Science'},
            {value: 'Physics', label: 'Physics'},
            {value: 'Chemistry', label: 'Chemistry'},
            {value: 'Biology', label: 'Biology'},
        ];






        const marksLabel = <Label text='Marks:'/>;
        const marksComboBox = <ComboBox value={this.props.marks}
                                        data={marksData}
                                        onChange={(event) => this.props.onMarksChange(event.target.value)}
        />;
        const idLabel = <Label text='Question id:'/>;
        const idValue = <Label text='2'/>;
        const chapterNameLabel = <Label text='Chapter Name:'/>;
        const chapterNameInput = <Input onChange={this.chapterNameChangedHandler}
                                        label='Chapter Name'
                                        id='ch-name-id'
                                        name='ch-name-name'
                                        value={this.props.chName}
                                        placeholder='Chapter Name'
        />;
        const classLabel = <Label text='Class: '/>;
        const classComboBox = <ComboBox value={this.props.cls}
                                        data={classData}
                                        onChange={(event) => this.props.onClassChange(event.target.value)}
        />;
        const subjectLabel = <Label text='Subject'/>;
        const subjectComboBox = <ComboBox value={this.props.sub}
                                          data={subjectData}
                                          onChange={(event) => this.props.onSubjectChange(event.target.value)}
        />;
        const typeLabel = <Label text='Type: '/>;
        const typeComboBox = <ComboBox value={this.props.type}
                                       data={typeData}
                                       onChange={(event) => this.props.onTypeChange(event.target.value)}
        />;
        const cancelButton = <FilledButton text='Cancel'
                                           buttonType='red'
                                           buttonClicked={this.cancelButtonClicked}
        />;
        const previewButton = <FilledButton text='Preview' buttonType='default'/>;
        const submitButton = <FilledButton text='Submit'
                                           buttonType='default'
                                           buttonClicked={this.submitButtonClicked}
        />;
        const addQuestionLabel = <Label text='Question :'/>;

        // const latex = '\\frac{1}{\\sqrt{2}}\\cdot 2';
        return (
            <div className={classes.AddQuestion}>
                <FormComponent labelComponent={idLabel} inputComponent={idValue} />
                <FormComponent labelComponent={classLabel} inputComponent={classComboBox} />
                <FormComponent labelComponent={subjectLabel} inputComponent={subjectComboBox} />
                <FormComponent labelComponent={chapterNameLabel} inputComponent={chapterNameInput} />
                <FormComponent labelComponent={typeLabel} inputComponent={typeComboBox}/>
                <FormComponent labelComponent={marksLabel} inputComponent={marksComboBox}/>
                <FormComponent labelComponent={addQuestionLabel} inputComponent={null} />
                <Editor
                    editorState={this.props.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName={classes.Editor}
                    onEditorStateChange={(editorState) => this.props.onEditorStateChange(editorState)}
                />
                {/*could be used to render mathematical expressions in future*/}
                {/*<MathQuill latex={latex}/>*/}
                <RowGroupedThree firstComp={cancelButton} secondComp={previewButton} thirdComp={submitButton}/>
                <AlertDialogBox
                    isOpen={this.state.alertDialogOpen}
                    onClose={this.alterDialogBoxCloseHandler}
                    dialogTitle={' '}
                    dialogContentText='Question Added Successfully'
                    buttonText='OK'
                    onClickButton={this.alertDialogBoxCloseHandler}
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chName : state.chapterName,
        cls : state.class,
        marks : state.marks,
        type : state.type,
        editorState: state.editorState,
        sub: state.subject
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChapterNameChange : (value) => dispatch(actions.changeChapterName(value)),
        onClassChange : (value) => dispatch(actions.changeClass(value)),
        onMarksChange : (value) => dispatch(actions.changeMarks(value)),
        onTypeChange : (value) => dispatch(actions.changeType(value)),
        onSubjectChange : (value) => dispatch(actions.changeSubject(value)),
        onEditorStateChange: (value) => dispatch(actions.changeEditorState(value)),
        resetState : () => dispatch(actions.resetState())
    };

};

export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion);