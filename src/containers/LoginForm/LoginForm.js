import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import classes from './LoginForm.css';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import * as actions from '../../store/actions/index';
import MaterialFab from '../../components/MaterialComponents/MaterialFab/MaterialFab';

class LoginForm extends Component {

    state = {
        loginMessage: ' ',
        authenticateButtonEnabled: false
    };

    onChangeUsername = (event) => {
        this.props.setUsername(event.target.value);
    };
    onChangePassword = (event) => {
        this.props.setPassword(event.target.value);
    };
    authenticateClickHandler = () => {

        const loginData = {
            username: this.props.username,
            password: this.props.password,
            permissions: {
                createUser: false
            }
        };
        this.props.setUsername('');
        this.props.setPassword('');
        this.props.setConfirmPassword('');
        if (this.props.loginMode) {
            axios.post('/verifyLogin', loginData)
                .then(userRes => {
                    console.log(userRes);
                    if (userRes.data.success) {
                        axios.post('/getAuthorizationToken', userRes.data.userData)
                            .then(res => {
                                console.log(res);
                                localStorage.setItem('token', res.data.token);
                                console.log(userRes.userData);
                                this.props.setActiveUser(userRes.data.userData);
                                this.props.history.replace('/start');
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log('User not verified');
                        this.setState({loginMessage: 'Authentication Failed'});
                    }

                })
                .catch(err => console.log(err));
        } else {
            if (this.props.password !== this.props.confirmPassword) {
                this.setState({loginMessage: 'Password Mismatch'});
                this.props.setPassword('');
                this.props.setConfirmPassword('');
            } else {
                axios.post('/createUser', loginData)
                    .then(res => {
                        console.log(res);
                        this.setState({loginMessage: res.data.message});
                    })
                    .catch(err => console.log(err));
            }

        }

    };
    signUpClickHandler = () => {
        this.props.setLoginMode(false);
    };
    loginClickHandler = () => {
        this.props.setLoginMode(true);
    };


    render() {

        let signUpPrompt = null;
        if (this.props.activeUser) {
            if (this.props.activeUser.permissions.createUser) {
                signUpPrompt = <div className={classes.SignUpPrompt}>
            <span style={{
                marginTop: '50px',
                fontFamily: 'Raleway',
                fontSize: '1.5rem',
                color: '#52E5AA',
                marginLeft: '20px'
            }}>Want to create a new user?</span>
                    <MaterialFab variant='extended' onClick={this.signUpClickHandler}>Create User</MaterialFab>
                </div>;
            }
        }
        const loginPrompt = <div className={classes.SignUpPrompt}>
            <span style={{
                marginTop: '50px',
                fontFamily: 'Raleway',
                fontSize: '1.5rem',
                color: '#52E5AA',
                marginLeft: '20px'
            }}>Want to gain access?</span>
            <MaterialFab variant='extended' onClick={this.loginClickHandler}>Login</MaterialFab>
        </div>;
        return (
            <div className={classes.LoginForm}>
                <div className={classes.FormComponents}>
                    <div style={{
                        height: '2.5vw',
                        width: '100%',
                        backgroundColor: '#52E5AA',
                        borderTopLeftRadius: '7px',
                        borderTopRightRadius: '7px'
                    }}>
                        <span style={{
                            fontFamily: 'Raleway',
                            fontSize: '2rem',
                            color: '#670A67',
                            marginLeft: '20px'
                        }}>{this.props.loginMode ? 'Login' : 'SignUp'} Form</span>
                        <span style={{
                            fontFamily: 'Raleway',
                            fontSize: '1.5rem',
                            color: '#670A67',
                            marginLeft: '20px'
                        }}>[{this.props.loginMode ? 'login' : 'sign-up'}]</span>
                    </div>
                    <div className={classes.FormComponent}>
                        <Label text='Username: '/>
                        <Input id='username'
                               name='username'
                               onChange={this.onChangeUsername}
                               value={this.props.username}
                        />
                    </div>
                    <div className={classes.FormComponent}>
                        <Label text='Password: '/>
                        <Input id='password'
                               name='password'
                               onChange={this.onChangePassword}
                               type='password'
                               value={this.props.password}
                        />
                    </div>
                    {this.props.loginMode ? null :
                        <div className={classes.FormComponent}>
                            <Label text='Cnf Password: '/>
                            <Input id='confirmPassword'
                                   name='confirmPassword'
                                   onChange={(event => this.props.setConfirmPassword(event.target.value))}
                                   type='password'
                                   value={this.props.confirmPassword}
                            />
                        </div>}
                    <div className={classes.FormComponent}>
                        <Label text={this.state.loginMessage}/>
                    </div>
                </div>
                {this.props.loginMode ? signUpPrompt : loginPrompt}
                <MaterialFab type='default' variant='extended'
                             onClick={this.authenticateClickHandler}>{this.props.loginMode ? 'Login' : 'SignUp'}</MaterialFab>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        password: state.loginReducer.password,
        activeUser: state.loginReducer.activeUser,
        loginMode: state.loginReducer.loginMode,
        confirmPassword: state.loginReducer.confirmPassword
    }
};

const mapDispatchTopProps = dispatch => {
    return {
        setUsername: (value) => dispatch(actions.setUsername(value)),
        setPassword: (value) => dispatch(actions.setPassword(value)),
        setActiveUser: (value) => dispatch(actions.setActiveUser(value)),
        setLoginMode: (value) => dispatch(actions.setLoginMode(value)),
        setConfirmPassword: (value) => dispatch(actions.setConfirmPassword(value))
    }
};

export default connect(mapStateToProps, mapDispatchTopProps)(withRouter(LoginForm));