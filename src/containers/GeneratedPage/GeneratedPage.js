import React, { Component } from "react";
import classes from "./GeneratedPage.css";
import ReactDOMServer from "react-dom/server";
import Header from "../../components/Specifics/GeneratePageComponents/Header/Header";
import PaperDetails from "../../components/Specifics/GeneratePageComponents/PaperDetails/PaperDetails";
import { connect } from "react-redux";
import { renderStateToHTML } from "../../components/Editor2/Editor2";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { Context, Node } from "react-mathjax2";

class GeneratedPage extends Component {
  componentWillUnmount() {
    this.props.resetGroupedQuestions();
    this.props.resetSelectedQuestions();
    this.props.history.push("/");
  }

  generateQuestions = () => {
    const questionObj = this.props.questions;
    let sections = [];
    for (let sectionEntries of Object.entries(questionObj)) {
      let types = [];
      for (let typeEntries of Object.entries(sectionEntries[1])) {
        const questions = typeEntries[1].map((question, index) => {
          let questionData = JSON.parse(question.questionData);
          const questionLines = parseQuestion(questionData);
          return (
            <Context input="tex">
              <div className={classes.RowFlex}>
                <li className={classes.Question}>
                  <div
                    className={classes.QuestionData}
                    // dangerouslySetInnerHTML={{
                    //   __html: questionData,
                    // }}
                  >
                    {questionLines}
                  </div>
                </li>
                <span>&nbsp;&nbsp;&nbsp;({question.marks})</span>
              </div>
            </Context>
          );
        });
        types.push(
          <div className={classes.TypePart}>
            <li className={classes.TypeListItem}>
              <span className={classes.TypeHeading}>{typeEntries[0]}</span>
            </li>
            <ol>{questions}</ol>
          </div>
        );
      }
      sections.push(
        <div className={classes.SectionPart}>
          <span className={classes.SectionHeading}>{sectionEntries[0]}</span>
          <ol>{types}</ol>
        </div>
      );
    }
    return sections;
  };

  render() {
    return (
      <div className={classes.GeneratedPage}>
        <Header subHeading={this.props.paperTerm} />
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

export const parseQuestion = (questionData) => {
  const questionLines = questionData.lines.map((line) => {
    const lineSegs = [];
    for (const [key, segment] of Object.entries(line)) {
      if (segment.type === "text") lineSegs.push(<span>{segment.text}</span>);
      if (segment.type === "bold") lineSegs.push(<b>{segment.text}</b>);
      if (segment.type === "math")
        lineSegs.push(<Node inline>{segment.text}</Node>);
    }
    return <p contentEditable>{lineSegs}</p>;
  });
  return questionLines;
};

const mapStateToProps = (state) => {
  return {
    questions: state.selectQuestionsReducer.groupedQuestions,
    paperClass: state.generatePaperReducer.paperClass,
    paperClassValue: state.generatePaperReducer.paperClassValue,
    paperSubject: state.generatePaperReducer.paperSubject,
    paperTime: state.generatePaperReducer.paperTime,
    paperMM: state.generatePaperReducer.paperMM,
    paperTerm: state.generatePaperReducer.paperTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetGroupedQuestions: () => dispatch(actions.resetGroupedQuestions()),
    resetSelectedQuestions: () => dispatch(actions.resetSelectedQuestions()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GeneratedPage));
