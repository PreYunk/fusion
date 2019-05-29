import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from "react-redux";
import HomeScreen from './containers/HomeScreen/HomeScreen';
import StartPage from './containers/StartPage/StartPage';
import AddQuestion from './containers/AddQuestion/AddQuestion';
import ViewQuestion from './containers/ViewQuestion/ViewQuestion';
import GeneratePaper from './containers/GeneratePaper/GeneratePaper';
import SelectQuestions from './containers/SelectQuestions/SelectQuestions';
import GeneratedPage from './containers/GeneratedPage/GeneratedPage';
import LoginForm from './containers/LoginForm/LoginForm';
import withAuth from './hoc/withAuth/withAuth';
import jwt from "jsonwebtoken";
import * as actions from "./store/actions";


class App extends Component {

    componentDidMount() {
        if(localStorage.getItem('token')) {
            const user = jwt.decode(localStorage.getItem('token'));
            const currentTime = new Date().getTime() / 1000;
            if(currentTime < user.exp) {
                this.props.setActiveUser({username: user.username, permissions: user.permissions});
            }
            else {
                localStorage.removeItem('token');
                this.props.setActiveUser(this.props.activeUser);
            }

        }
    }

    // componentDidMount() {
    //     window.addEventListener('beforeunload', ev => {
    //         ev.preventDefault();
    //         console.log(localStorage.getItem('token'));
    //         localStorage.removeItem('token');
    //         return ev.returnValue = 'Are you sure you want to close?';
    //     });
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('beforeunload');
    // }

    render() {


        //MY ROUTES ARE MANAGED HERE
        return (
            <div>
                <Route path="/start/generate/select" component={withAuth(SelectQuestions)}/>
                <Route path="/start/generate" exact component={withAuth(GeneratePaper)}/>
                <Route path="/start/add" component={withAuth(AddQuestion)}/>
                <Route path="/start/view" component={withAuth(ViewQuestion)} />
                <Route path="/start" exact component={withAuth(StartPage)}/>
                <Route path="/gen" component={withAuth(GeneratedPage)}/>
                <Route path="/login" component={LoginForm}/>
                <Route path="/" exact component={HomeScreen}/>
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
        setActiveUser: (value) => dispatch(actions.setActiveUser(value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
