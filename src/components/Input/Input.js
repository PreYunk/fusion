import React from 'react';
import Input from '@material-ui/core/Input';
import {withStyles} from "@material-ui/core/styles";

const styles = {
    root: {
        backgroundColor: 'aquamarine',
        width: '300px'
    }
};

const input = (props) => {
    const {classes} = props;
    return (
        <Input
            classes={{root: classes.root}}
            id={props.id}
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
        />
    );
};

export default withStyles(styles)(input);