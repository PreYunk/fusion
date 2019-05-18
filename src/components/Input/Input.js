import React from 'react';
import Input from '@material-ui/core/Input';
import {withStyles} from "@material-ui/core/styles";

const styles = {
    root: {
        backgroundColor: '#52E5AA',
        width: '300px',
        borderRadius: '50px'
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
            type={props.type?props.type: 'text'}
            inputProps={{
                style: {textAlign: 'center'}
            }}
        />
    );
};

export default withStyles(styles)(input);