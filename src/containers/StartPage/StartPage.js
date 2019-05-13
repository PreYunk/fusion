import React, {Component} from 'react';
import classes from './StartPage.css';
import {Link} from 'react-router-dom';

class StartPage extends Component {
    render() {
        const classNames = [];
        classNames.push(classes.CenteredDiv);
        classNames.push(classes.Options);
        return (
            <div className={classNames.join(' ')}>
                <Link to="/start/add">Add</Link>
                <Link to="/start/view">View</Link>
                <Link to="/start/generate">Generate</Link>
            </div>
        );
    }
}

export default StartPage;