import React from 'react';
import classes from './RowGroupedThree.css';

const rowGroupedThree = (props) => {
    return (
        <div className={classes.RowGroupedThree}>
            {props.firstComp}
            {props.secondComp}
            {props.thirdComp}
        </div>
    );
};

export default rowGroupedThree;