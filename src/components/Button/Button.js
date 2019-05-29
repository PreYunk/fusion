import React from 'react';
import classes from './Button.css';

const button = (props) => {
    return (
        <button
            className={classes.Button}
            onClick={props.onButtonClicked}
        >
            {props.text}
        </button>
    );
};

export default button;