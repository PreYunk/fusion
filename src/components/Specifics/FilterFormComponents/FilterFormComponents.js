import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from "@material-ui/core/styles";
import {MenuItem} from "@material-ui/core";
import classesNames from './FilterFormComponents.css';

const styles = () => ({
   root: {
       width: '200px'
   }
});

const filterFormComponents = (props) => {
    const {classes} = props;

    const subjectMenuItems = props.subjectData.map(menuItemObj => {
        return <MenuItem value={menuItemObj.value} >{menuItemObj.label}</MenuItem>;
    });
    const subjectSelect = <FormControl disabled={!props.subjectSwitchChecked}>
        <InputLabel>Subject</InputLabel>
        <Select value={props.subjectFilterState}
                onChange={props.subjectStateChanged}
                autoWidth={true}
                className={classes.root}
        >
            {subjectMenuItems}

        </Select>
    </FormControl>;

    const classMenuItems = props.classData.map(menuItemObj => {
        return <MenuItem value={menuItemObj.value} >{menuItemObj.label}</MenuItem>;
    });
    const classSelect = <FormControl disabled={!props.classSwitchChecked}>
        <InputLabel>Class</InputLabel>
        <Select value={props.classFilterState}
                onChange={props.classStateChanged}
                autoWidth={true}
                className={classes.root}
        >
            {classMenuItems}

        </Select>
    </FormControl>;

    // const chapterNameMenuItems = props.chapterNameData.map(menuItemObj => {
    //     return <MenuItem value={menuItemObj.value} >{menuItemObj.label}</MenuItem>;
    // });
    // const chapterNameSelect = <FormControl>
    //     <InputLabel>Chapter Name</InputLabel>
    //     <Select value={props.chapterNameFilterState}
    //             onChange={props.chapterNameStateChanged}
    //     >
    //         {chapterNameMenuItems}
    //
    //     </Select>
    // </FormControl>;


    const subjectSwitch = <Switch checked={props.subjectSwitchChecked}
                                  onChange={props.switchChangeHandler('subject')}
                                  value='subjectFilter'
    />;
    const classSwitch = <Switch checked={props.classSwitchChecked}
                                  onChange={props.switchChangeHandler('class')}
                                  value='classFilter'
    />;
    // const chapterNameSwitch = <Switch checked={props.chapterNameSwitchChecked}
    //                               onChange={() => props.handlerSwitchChange('chapterName')}
    //                               value='chapterNameFilter'
    // />;

    return (
        <FormGroup row>
            <div className={classesNames.FilterFormComponent}>
                {subjectSwitch}
                {subjectSelect}
            </div>
            <div className={classesNames.FilterFormComponent}>
                {classSwitch}
                {classSelect}
            </div>
            {/*<div className={classes.FilterFormComponent}>*/}
            {/*    {chapterNameSwitch}*/}
            {/*    {chapterNameSelect}*/}
            {/*</div>*/}
        </FormGroup>
    );
};

export default withStyles(styles)(filterFormComponents);