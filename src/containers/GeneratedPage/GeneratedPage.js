import React, {Component} from 'react';
import classes from './GeneratedPage.css';
import Header from '../../components/Specifics/GeneratePageComponents/Header/Header';
import PaperDetails from '../../components/Specifics/GeneratePageComponents/PaperDetails/PaperDetails';
import {connect} from "react-redux";
import draftToHTML from 'draftjs-to-html';
import * as actions from '../../store/actions/index';


class GeneratedPage extends Component {
    componentWillUnmount() {
        this.props.resetGroupedQuestions();
        this.props.resetSelectedQuestions();
        this.props.history.push('/');
    }

    generateQuestions = () => {
        const questionObj = this.props.questions;
        let sections = [];
        for (let sectionEntries of Object.entries(questionObj)) {
            console.log(sectionEntries);
            let types = [];
            for (let typeEntries of Object.entries(sectionEntries[1])) {
                console.log(typeEntries);
                const questions = typeEntries[1].map((question, index) => {
                    let questionData = draftToHTML(JSON.parse(question.questionData));
                    return (<div className={classes.RowFlex}>
                            <li className={classes.Question}>
                                <div className={classes.QuestionData}
                                     dangerouslySetInnerHTML={{__html: questionData}}></div>
                            </li>
                            <span>&nbsp;&nbsp;&nbsp;({question.marks})</span>
                        </div>

                    )
                });
                types.push(<div className={classes.TypePart}>
                    <li className={classes.TypeListItem}><span className={classes.TypeHeading}>{typeEntries[0]}</span></li>
                    <ol>
                        {questions}
                    </ol>

                </div>)
            }
            sections.push(<div className={classes.SectionPart}>
                <span className={classes.SectionHeading}>{sectionEntries[0]}</span>
                <ol>{types}</ol>
            </div>)
        }
        return sections;
    };

    render() {

        return (
            <div className={classes.GeneratedPage}>
                <Header subHeading={this.props.paperTerm}/>
                <PaperDetails
                    cls={this.props.paperClass}
                    subject={this.props.paperSubject}
                    mm={this.props.paperMM}
                    time={this.props.paperTime}
                />
                {this.generateQuestions()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.selectQuestionsReducer.groupedQuestions,
        paperClass: state.generatePaperReducer.paperClass,
        paperClassValue: state.generatePaperReducer.paperClassValue,
        paperSubject: state.generatePaperReducer.paperSubject,
        paperTime: state.generatePaperReducer.paperTime,
        paperMM: state.generatePaperReducer.paperMM,
        paperTerm: state.generatePaperReducer.paperTerm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resetGroupedQuestions: () => dispatch(actions.resetGroupedQuestions()),
        resetSelectedQuestions: () => dispatch(actions.resetSelectedQuestions())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneratedPage);