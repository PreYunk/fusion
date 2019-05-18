import React, {Component} from 'react';
import classes from './GeneratePaper.css';
import List from '../../components/List/List';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../../components/Input/Input';
import ComboBox from '../../components/ComboBox/ComboBox';
import Label from '../../components/Label/Label';
import MaterialFab from '../../components/MaterialComponents/MaterialFab/MaterialFab';

class GeneratePaper extends Component {

    state = {
        classSelectedIndex: -1,
        subjectSelectedIndex: -1
    };

    classListClickHandler = (event, label, index) => {
        this.setState({classSelectedIndex: index});
        this.props.setPaperClass(label);
    };
    subjectListClickHandler = (event, label, index) => {
        this.setState({subjectSelectedIndex: index});
        this.props.setPaperSubject(label);
    };

    render() {

        const classData = [
            {
                value: 1,
                label: 'I',
                selected: this.state.classSelectedIndex === 0,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 2,
                label: 'II',
                selected: this.state.classSelectedIndex === 1,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 3,
                label: 'III',
                selected: this.state.classSelectedIndex === 2,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 4,
                label: 'IV',
                selected: this.state.classSelectedIndex === 3,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 5,
                label: 'V',
                selected: this.state.classSelectedIndex === 4,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 6,
                label: 'VI',
                selected: this.state.classSelectedIndex === 5,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 7,
                label: 'VII',
                selected: this.state.classSelectedIndex === 6,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 8,
                label: 'VIII',
                selected: this.state.classSelectedIndex === 7,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 9,
                label: 'IX',
                selected: this.state.classSelectedIndex === 8,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 10,
                label: 'X',
                selected: this.state.classSelectedIndex === 9,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 11,
                label: 'XI',
                selected: this.state.classSelectedIndex === 10,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
            {
                value: 12,
                label: 'XII',
                selected: this.state.classSelectedIndex === 11,
                onClick: (event, label, index) => this.classListClickHandler(event, label, index)
            },
        ];

        const subjectData = [
            {
                selected: this.state.subjectSelectedIndex === 0,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'English I'
            },
            {
                selected: this.state.subjectSelectedIndex === 1,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'English II'
            },
            {
                selected: this.state.subjectSelectedIndex === 2,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Maths'
            },
            {
                selected: this.state.subjectSelectedIndex === 3,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'History & Civics'
            },
            {
                selected: this.state.subjectSelectedIndex === 4,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'SST'
            },
            {
                selected: this.state.subjectSelectedIndex === 5,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'GK'
            },
            {
                selected: this.state.subjectSelectedIndex === 6,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Computer'
            },
            {
                selected: this.state.subjectSelectedIndex === 7,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Hindi'
            },
            {
                selected: this.state.subjectSelectedIndex === 8,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Sanskrit'
            },
            {
                selected: this.state.subjectSelectedIndex === 9,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Geography'
            },
            {
                selected: this.state.subjectSelectedIndex === 10,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Science'
            },
            {
                selected: this.state.subjectSelectedIndex === 11,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Physics'
            },
            {
                selected: this.state.subjectSelectedIndex === 12,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Chemistry'
            },
            {
                selected: this.state.subjectSelectedIndex === 13,
                onClick: (event, label, index) => this.subjectListClickHandler(event, label, index),
                label: 'Biology'
            },
        ];

        const termData = [
            {value: 'I Unit Test', label: 'I Unit Test'},
            {value: 'II Unit Test', label: 'II Unit Test'},
            {value: 'III Unit Test', label: 'III Unit Test'},
            {value: 'Half Yearly', label: 'Half Yearly'},
            {value: 'Annual', label: 'Annual'}
        ];
        return (
            <div className={classes.GeneratePaper}>
                <List
                    listData={classData}
                    header='Class:'
                />
                <List
                    listData={subjectData}
                    header='Subject:'
                />
                <div className={classes.AdditionalDetails}>
                    <Label text='Additional Details:'/>
                    <div className={classes.AdditionalDetailsControls}>
                        <div className={classes.AdditionalDetailsControl}>
                            <Label text='Time (Hrs): '/>;
                            <Input name='time' onChange={(event) => this.props.setPaperTime(event.target.value)}
                                   value={this.props.paperTime} placeholder='Time' type='number'/>;
                        </div>
                        <div className={classes.AdditionalDetailsControl}>
                            <Label text='MM: '/>;
                            <Input name='mm' onChange={(event) => this.props.setPaperMM(event.target.value)}
                                   value={this.props.paperMM} placeholder='Max Marks' type='number'/>
                        </div>
                        <div className={classes.AdditionalDetailsControl}>
                            <Label text='Term: '/>;
                            <ComboBox
                                value={this.props.paperTerm}
                                onChange={(event) => this.props.setPaperTerm(event.target.value)}
                                data={termData}
                            />
                        </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <MaterialFab onClick={this.generateNextButtonClicked}>Next</MaterialFab>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        paperClass: state.generatePaperReducer.paperClass,
        paperSubject: state.generatePaperReducer.paperSubject,
        paperTime: state.generatePaperReducer.paperTime,
        paperMM: state.generatePaperReducer.paperMM,
        paperTerm: state.generatePaperReducer.paperTerm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setPaperClass: (value) => dispatch(actions.setPaperClass(value)),
        setPaperSubject: (value) => dispatch(actions.setPaperSubject(value)),
        setPaperTime: (value) => dispatch(actions.setPaperTime(value)),
        setPaperMM: (value) => dispatch(actions.setPaperMM(value)),
        setPaperTerm: (value) => dispatch(actions.setPaperTerm(value)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneratePaper);