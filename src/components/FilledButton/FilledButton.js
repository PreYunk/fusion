import React from 'react';
import classes from './FilledButton.css';
const filledButton = (props) => {
    let className;
    if(props.buttonType === 'red')
    className = classes.RedColorButton;
    if(props.buttonType === 'default')
        className = classes.DefaultColorButton;
    return (
        <button className={className}
                onClick={props.buttonClicked}
        >
            {props.text}
        </button>
    );
};

export default filledButton;