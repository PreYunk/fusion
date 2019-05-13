import React, {Component} from 'react';
import {connect} from "react-redux";
import ComboBox from '../../components/ComboBox/ComboBox';
import Label from  '../../components/Label/Label';
import FormComponent from '../../components/FormComponent/FormComponent';
import Input from '../../components/Input/Input';
import classes from './AddQuestion.css';
import * as actions from '../../store/actions/index';
class AddQuestion extends Component {

    chapterNameChangedHandler = (event) => {
        console.log(event.target.value);
        this.props.onChapterNameChange(event.target.value);
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
        const typeLabel = <Label text='Type: '/>;
        const typeComboBox = <ComboBox value={this.props.type}
                                       data={typeData}
                                       onChange={(event) => this.props.onTypeChange(event.target.value)}
        />;
        return (
            <div className={classes.AddQuestion}>
                <FormComponent labelComponent={idLabel} inputComponent={idValue} />
                <FormComponent labelComponent={chapterNameLabel} inputComponent={chapterNameInput} />
                <FormComponent labelComponent={classLabel} inputComponent={classComboBox} />
                <FormComponent labelComponent={typeLabel} inputComponent={typeComboBox}/>
                <FormComponent labelComponent={marksLabel} inputComponent={marksComboBox}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chName : state.chapterName,
        cls : state.class,
        marks : state.marks,
        type : state.type
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChapterNameChange : (value) => dispatch(actions.changeChapterName(value)),
        onClassChange : (value) => dispatch(actions.changeClass(value)),
        onMarksChange : (value) => dispatch(actions.changeMarks(value)),
        onTypeChange : (value) => dispatch(actions.changeType(value))
    };

};

export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion);