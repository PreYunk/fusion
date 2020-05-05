import React, { Component } from "react";

import classes from "./GeneratePaper.css";
import List from "../../components/List/List";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import MaterialFab from "../../components/MaterialComponents/MaterialFab/MaterialFab";
import axios from "axios";
import CSSTransition from "react-transition-group/CSSTransition";
import { withRouter } from "react-router-dom";

class GeneratePaper extends Component {
  state = {
    classSelectedIndex: -1,
    subjectSelectedIndex: -1,
  };

  classListClickHandler = (event, label, index) => {
    this.setState({ classSelectedIndex: index });
    let classValue = 0;
    switch (label) {
      case "I":
        classValue = 1;
        break;
      case "II":
        classValue = 2;
        break;
      case "III":
        classValue = 3;
        break;
      case "IV":
        classValue = 4;
        break;
      case "V":
        classValue = 5;
        break;
      case "VI":
        classValue = 6;
        break;
      case "VII":
        classValue = 7;
        break;
      case "VIII":
        classValue = 8;
        break;
      case "IX":
        classValue = 9;
        break;
      case "X":
        classValue = 10;
        break;
      case "XI":
        classValue = 11;
        break;
      case "XII":
        classValue = 12;
        break;
    }
    this.props.setPaperClass(label, classValue);
  };
  subjectListClickHandler = (event, label, index) => {
    this.setState({ subjectSelectedIndex: index });
    this.props.setPaperSubject(label);
  };

  generateNextButtonClicked = () => {
    axios
      .get(
        "/getQuestions?class=" +
          this.props.paperClassValue +
          "&subject=" +
          this.props.paperSubject
      )
      .then((result) => {
        console.log(result.data.data);
        this.props.setFetchedQuestions(result.data.data);
      })
      .catch((err) => console.log(err));
    this.props.history.push("/start/generate/select");
  };

  render() {
    const classData = [
      {
        value: 1,
        label: "I",
        selected: this.state.classSelectedIndex === 0,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 2,
        label: "II",
        selected: this.state.classSelectedIndex === 1,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 3,
        label: "III",
        selected: this.state.classSelectedIndex === 2,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 4,
        label: "IV",
        selected: this.state.classSelectedIndex === 3,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 5,
        label: "V",
        selected: this.state.classSelectedIndex === 4,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 6,
        label: "VI",
        selected: this.state.classSelectedIndex === 5,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 7,
        label: "VII",
        selected: this.state.classSelectedIndex === 6,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 8,
        label: "VIII",
        selected: this.state.classSelectedIndex === 7,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 9,
        label: "IX",
        selected: this.state.classSelectedIndex === 8,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 10,
        label: "X",
        selected: this.state.classSelectedIndex === 9,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 11,
        label: "XI",
        selected: this.state.classSelectedIndex === 10,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
      {
        value: 12,
        label: "XII",
        selected: this.state.classSelectedIndex === 11,
        onClick: (event, label, index) =>
          this.classListClickHandler(event, label, index),
      },
    ];

    const subjectData = [
      {
        selected: this.state.subjectSelectedIndex === 0,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "English I",
      },
      {
        selected: this.state.subjectSelectedIndex === 1,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "English II",
      },
      {
        selected: this.state.subjectSelectedIndex === 2,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Maths",
      },
      {
        selected: this.state.subjectSelectedIndex === 3,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "History & Civics",
      },
      {
        selected: this.state.subjectSelectedIndex === 4,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "SST",
      },
      {
        selected: this.state.subjectSelectedIndex === 5,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "GK",
      },
      {
        selected: this.state.subjectSelectedIndex === 6,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Computer",
      },
      {
        selected: this.state.subjectSelectedIndex === 7,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Hindi",
      },
      {
        selected: this.state.subjectSelectedIndex === 8,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Sanskrit",
      },
      {
        selected: this.state.subjectSelectedIndex === 9,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Geography",
      },
      {
        selected: this.state.subjectSelectedIndex === 10,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Science",
      },
      {
        selected: this.state.subjectSelectedIndex === 11,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Physics",
      },
      {
        selected: this.state.subjectSelectedIndex === 12,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Chemistry",
      },
      {
        selected: this.state.subjectSelectedIndex === 13,
        onClick: (event, label, index) =>
          this.subjectListClickHandler(event, label, index),
        label: "Biology",
      },
    ];
    return (
      <div className={classes.GeneratePaper}>
        <div className={classes.DataLists}>
          <div className={classes.DataList}>
            <List listData={classData} header="Class:" />
          </div>
          <CSSTransition
            in={this.state.classSelectedIndex >= 0}
            timeout={300}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: classes.SubjectRevealEnter,
              enterActive: classes.SubjectRevealEnterActive,
            }}
          >
            <div className={classes.DataList}>
              <List listData={subjectData} header="Subject:" />
            </div>
          </CSSTransition>
        </div>

        <CSSTransition
          in={this.state.subjectSelectedIndex >= 0}
          mountOnEnter
          unmountOnExit
          timeout={300}
          classNames={{
            enter: classes.OptionsRevealEnter,
            enterActive: classes.OptionsRevealEnterActive,
          }}
        >
          <div className={classes.AdditionalDetails}>
            <Label text="Additional Details:" />
            <div className={classes.AdditionalDetailsControls}>
              <div className={classes.AdditionalDetailsControl}>
                <Label text="Time (Hrs): " />
                <Input
                  name="time"
                  onChange={(event) =>
                    this.props.setPaperTime(event.target.value)
                  }
                  value={this.props.paperTime}
                  placeholder="Time"
                  type="number"
                />
              </div>
              <div className={classes.AdditionalDetailsControl}>
                <Label text="MM: " />
                <Input
                  name="mm"
                  onChange={(event) =>
                    this.props.setPaperMM(event.target.value)
                  }
                  value={this.props.paperMM}
                  placeholder="Max Marks"
                  type="number"
                />
              </div>
              <div className={classes.AdditionalDetailsControl}>
                <Label text="Name of Examination: " />
                <Input
                  name="exam"
                  value={this.props.paperTerm}
                  onChange={(event) =>
                    this.props.setPaperTerm(event.target.value)
                  }
                  placeholder="Name of Exam"
                />
              </div>
              <div className={classes.AdditionalDetailsControl}>
                <Label text="No. of Sections: " />
                <Input
                  name="sectionNumbers"
                  onChange={(event) =>
                    this.props.setSectionNumbers(event.target.value)
                  }
                  value={this.props.sectionNumbers}
                  placeholder="Sections"
                  type="number"
                />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <MaterialFab onClick={this.generateNextButtonClicked}>
                Next
              </MaterialFab>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paperClass: state.generatePaperReducer.paperClass,
    paperClassValue: state.generatePaperReducer.paperClassValue,
    paperSubject: state.generatePaperReducer.paperSubject,
    paperTime: state.generatePaperReducer.paperTime,
    paperMM: state.generatePaperReducer.paperMM,
    paperTerm: state.generatePaperReducer.paperTerm,
    sectionNumbers: state.generatePaperReducer.sectionNumbers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPaperClass: (label, classValue) =>
      dispatch(actions.setPaperClass(label, classValue)),
    setPaperSubject: (value) => dispatch(actions.setPaperSubject(value)),
    setPaperTime: (value) => dispatch(actions.setPaperTime(value)),
    setPaperMM: (value) => dispatch(actions.setPaperMM(value)),
    setPaperTerm: (value) => dispatch(actions.setPaperTerm(value)),
    setSectionNumbers: (value) => dispatch(actions.setSectionNumbers(value)),
    setFetchedQuestions: (value) =>
      dispatch(actions.setFetchedQuestions(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GeneratePaper));
