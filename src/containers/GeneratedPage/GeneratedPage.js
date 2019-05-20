import React, {Component} from 'react';
import classes from './GeneratedPage.css';
import {connect} from "react-redux";

class GeneratedPage extends Component {
    render() {
        return (
            <div className={classes.GeneratedPage}>
                This is the generated question paper
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      questions: state.selectQuestionsReducer.groupedQuestions
  }
};

export default connect(mapStateToProps)(GeneratedPage);