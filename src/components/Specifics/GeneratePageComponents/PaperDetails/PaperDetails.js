import React from 'react';
import classes from './PaperDetails.css';

const paperDetails = (props) => {
    return (
        <React.Fragment>
            <table className={classes.PaperDetails}>
                <tbody>
                <tr className={classes.UpperDetail}>
                    <td className={classes.LeftDetail}>Class: {props.cls}</td>
                    <td className={classes.RightDetail}>Time: {props.time}{props.time == 1 ? 'Hr' : 'Hrs'}</td>
                </tr>
                <tr>
                    <td className={classes.LeftDetail}>Subject: {props.subject}</td>
                    <td className={classes.RightDetail}>MM: {props.mm}</td>
                </tr>
                </tbody>

            </table>
            <hr/>
        </React.Fragment>

    );
};

export default paperDetails;