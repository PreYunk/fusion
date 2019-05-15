import React, {Component} from 'react';
import ExpandableComponents from '../../components/ExpandableComponents/ExpandableComponents';
import classes from './ViewQuestion.css';
import FormDialog from '../../components/FormDialog/FormDialog';
import FilterFormComponent from '../../components/Specifics/FilterFormComponents/FilterFormComponents';
import {convertFromRaw} from 'draft-js';
import MaterialFab from '../../components/MaterialComponents/MaterialFab/MaterialFab';
import FilledButton from '../../components/FilledButton/FilledButton';
import axios from 'axios';

class ViewQuestion extends Component {

    state = {
        formDialogBoxOpen: false,
        subjectFilter: '',
        classFilter: '',
        subjectFilterEnabled: false,
        classFilterEnabled: false,
        questionDataFetched: [],
        subjectsFetched: [],
        classesFetched: [],
        expandableComponentsData: []
    };

    formAcceptHandler = () => {
        let queryString = '';
        if (this.state.subjectFilterEnabled && this.state.classFilterEnabled)
            queryString = '?subject=' + this.state.subjectFilter + '&class=' + this.state.classFilter;
        else if (this.state.subjectFilterEnabled)
            queryString = '?subject=' + this.state.subjectFilter;
        else if (this.state.classFilterEnabled)
            queryString = '?class=' + this.state.classFilter;
        // axios.get('http://localhost:3001/api/getQuestions'+queryString)
        axios.get('https://polar-sea-14304.herokuapp.com/api/getQuestions'+queryString)
            .then(questions => {
                console.log(queryString);
                this.setState({questionDataFetched: questions.data.data});
                const expandableQuestions = questions.data.data.map(question => {
                    const questionDetails = <div className={classes.QuestionDetailsDiv}>
                        <ul className={classes.QuestionDetails} >
                            <li className={classes.QuestionDetail}>Subject: {question.subject}</li>
                            <li className={classes.QuestionDetail}>Class: {question.cls}</li>
                            <li className={classes.QuestionDetail}>Type: {question.type}</li>
                            <li className={classes.QuestionDetail}>Marks: {question.marks}</li>
                        </ul>
                    </div>;
                    const expandableActions = <div className={classes.ExpandableActions}>
                        <MaterialFab>Preview</MaterialFab>
                        <MaterialFab>Edit</MaterialFab>
                    </div>;
                    let rawQue = convertFromRaw(JSON.parse(question.questionData)).getPlainText();
                    if(rawQue.length >=50)
                        rawQue = rawQue.slice(0,51);
                    const expSummaryComponent = <div className={classes.SummaryComponents}>
                        <span className={classes.SummaryComponent}>{rawQue}</span>
                        <span className={classes.SummaryComponent}>{question.chapterName}</span>
                    </div>;
                    return {summary: '', summaryComponent: expSummaryComponent, detail: questionDetails, actions: expandableActions};
                });
                this.setState({expandableComponentsData: expandableQuestions});
                this.setState({formDialogBoxOpen: false});
                console.log(this.state.questionDataFetched);
            })
            .catch(err => console.log(err));

    };

    filterButtonClickHandler = () => {
        this.setState({formDialogBoxOpen: true});
    };
    handleFormDialogClose = () => {
        console.log('Dialog onClose fired');
        this.setState({formDialogBoxOpen: false});
    };
    subjectStateChanged = (event) => {
        this.setState({subjectFilter: event.target.value})
    };
    classStateChanged = (event) => {
        this.setState({classFilter: event.target.value})
    };
    switchStateChanged = switchName => event => {
        console.log('Switched')
        if (switchName === 'subject')
            this.setState({subjectFilterEnabled: event.target.checked});
        if (switchName === 'class')
            this.setState({classFilterEnabled: event.target.checked})
    };


    render() {
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


        /*const expandableComponentsData = [
            {actions: null, detail: 'Dummy', summary: 'Dummy'},
            {actions: null, detail: 'Dummy', summary: 'Dummy'},
            {actions: null, detail: 'Dummy', summary: 'Dummy'},
            {actions: null, detail: 'Dummy', summary: 'Dummy'},
            {actions: null, detail: 'Dummy', summary: 'Dummy'},
        ];*/
        return (
            <div className={classes.ViewQuestions}>
                {this.state.expandableComponentsData.length ?
                    <ExpandableComponents expandableComponentsData={this.state.expandableComponentsData}/>:
                    <h1 className={classes.NoQuestionsHeading}>Press Filter to display questions</h1>
                }

                <div className={classes.ViewQuestionsControls}>
                    <FilledButton buttonType='default' text='View all' buttonClicked={null}/>
                    <FilledButton buttonType='default' text='Filter' buttonClicked={this.filterButtonClickHandler}/>
                </div>
                <FormDialog
                    isOpen={this.state.formDialogBoxOpen}
                    onClose={this.handleFormDialogClose}
                    dialogTitle='Filter'
                    dialogContentText='Field not required must be unchecked'
                    okButtonText='Done'
                    okButtonClicked={this.formAcceptHandler}
                    formComponent={<FilterFormComponent subjectFilterState={this.state.subjectFilter}
                                                        subjectStateChanged={this.subjectStateChanged}
                                                        subjectData={subjectData}
                                                        classData={classData}
                                                        classFilterState={this.state.classFilter}
                                                        classStateChanged={this.classStateChanged}
                                                        switchChangeHandler={(value) => this.switchStateChanged(value)}
                                                        classSwitchChecked={this.state.classFilterEnabled}
                                                        subjectSwitchChecked={this.state.subjectFilterEnabled}

                    />}
                />
            </div>
        );
    }
}

export default ViewQuestion;