import React from 'react';
import classes from './Label.css';

const label = (props) => {
    return (
        <span className={classes.Label}>{props.text}</span>
    );
};

export default label;