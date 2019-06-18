import React, {Component} from 'react';
import classes from './StartPage.css';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import MaterialFab from '../../components/MaterialComponents/MaterialFab/MaterialFab';
import * as actions from '../../store/actions/index';

class StartPage extends Component {

    logoutClickHandler = () => {
        localStorage.removeItem('token');

        const initialActiveUser = {
            userId: null,
            username: ' ',
            permissions: {
                createUser: false,
                addQuestion: false,
                updateQuestion: false,
                generateQuestion: false
            }
        };
        this.props.setActiveUser(initialActiveUser);
        this.props.setLoginMode(true);
        this.props.history.push('/login');
    };
    createUserClickHandler = () => {
        this.props.setLoginMode(false);
        this.props.history.push('/login');
    };

    render() {
        const activeUser = this.props.activeUser;
        console.log(activeUser);

        const classNames = [];
        classNames.push(classes.CenteredDiv);
        classNames.push(classes.Options);
        return (
            <div className={classes.StartPage}>
                <nav className={classes.NavBar}>
                    <span className={classes.NavText}>Hi there, {activeUser.username}</span>
                    <div className={classes.NavControls}>
                        {activeUser.permissions.createUser ?
                            <MaterialFab variant='extended' onClick={this.createUserClickHandler}>Create
                                User</MaterialFab> :
                            null}
                        {}

                        <MaterialFab variant='extended' onClick={this.logoutClickHandler}>Log out</MaterialFab>
                    </div>
                </nav>
                <div className={classNames.join(' ')}>
                    <Link to="/start/add">Add</Link>
                    <Link to="/start/view">View</Link>
                    <Link to="/start/generate">Generate</Link>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        activeUser: state.loginReducer.activeUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoginMode: (value) => dispatch(actions.setLoginMode(value)),
        setActiveUser: (value) => dispatch(actions.setActiveUser(value))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(StartPage);