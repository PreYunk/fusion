import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import classes from './HomeScreen.css';

class HomeScreen extends Component {

    startButtonClicked = () => {
        console.log(this.props);
        this.props.history.push('start');
    };

    render() {
        return (
            <div className={classes.HomeScreen}>
                <Logo/>
                <Button onButtonClicked={this.startButtonClicked} text="Start"/>
            </div>
        );
    }
}

export default withRouter(HomeScreen);