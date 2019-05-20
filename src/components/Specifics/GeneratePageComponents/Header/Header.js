import React from 'react';
import classes from './Header.css';

const header = (props) => {
    return (
        <div className={classes.Header}>
            <span className={classes.Heading}>Spring Field Senior Secondary Academy</span>
            <span className={classes.SubHeading}>I Unit Test</span>
        </div>
    );
};

export default header;