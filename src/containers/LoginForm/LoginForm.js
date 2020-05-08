import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

import classes from "./LoginForm.css";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import * as actions from "../../store/actions/index";
import MaterialFab from "../../components/MaterialComponents/MaterialFab/MaterialFab";
import Switch from "../../components/Switch/Switch";

class LoginForm extends Component {
  state = {
    loginMessage: " ",
    authenticateButtonEnabled: false,
    permissions: {
      createUser: false,
      addQuestion: false,
      generateQuestion: false,
      updateQuestion: false,
    },
  };

  onChangeUsername = (event) => {
    this.props.setUsername(event.target.value);
  };
  onChangePassword = (event) => {
    this.props.setPassword(event.target.value);
  };
  authenticateClickHandler = () => {
    const loginData = {
      username: this.props.username.trim(),
      password: this.props.password,
      permissions: this.state.permissions,
    };
    this.props.setUsername("");
    this.props.setPassword("");
    this.props.setConfirmPassword("");
    if (this.props.loginMode) {
      axios
        .post("/verifyLogin", loginData)
        .then((userRes) => {
          if (userRes.data.success) {
            axios
              .post("/getAuthorizationToken", userRes.data.userData)
              .then((res) => {
                localStorage.setItem("token", res.data.token);
                this.props.setActiveUser(userRes.data.userData);
                this.props.history.replace("/start");
              })
              .catch((err) => console.log(err));
          } else {
            console.log("User not verified");
            this.setState({ loginMessage: "Authentication Failed" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (this.props.password !== this.props.confirmPassword) {
        this.setState({ loginMessage: "Password Mismatch" });
        this.props.setPassword("");
        this.props.setConfirmPassword("");
      } else {
        axios
          .post("/createUser", loginData)
          .then((res) => {
            this.setState({ loginMessage: res.data.message });
          })
          .catch((err) => console.log(err));
      }
    }
  };
  signUpClickHandler = () => {
    this.props.setLoginMode(false);
  };
  loginClickHandler = () => {
    this.props.setLoginMode(true);
  };
  handlePermissionChange = (name, event) => {
    let permissions = { ...this.state.permissions };
    permissions[name] = event.target.checked;
    console.log(permissions);
    this.setState({ permissions: permissions });
  };

  render() {
    let signUpPrompt = null;
    if (this.props.activeUser) {
      if (this.props.activeUser.permissions.createUser) {
        signUpPrompt = (
          <div className={classes.SignUpPrompt} id={classes.Prompt}>
            <span
              style={{
                marginTop: "50px",
                fontFamily: "Raleway",
                fontSize: "1rem",
                color: "#313131",
                marginLeft: "20px",
              }}
            >
              Want to create a new user?
            </span>
            <MaterialFab variant="extended" onClick={this.signUpClickHandler}>
              Create User
            </MaterialFab>
          </div>
        );
      }
    }
    const loginPrompt = (
      <div className={classes.SignUpPrompt} id={classes.Prompt}>
        <span
          style={{
            fontFamily: "Raleway",
            fontSize: "1rem",
            color: "#313131",
            textAlign: "center",
          }}
        >
          Want to gain access?
        </span>
        <MaterialFab variant="extended" onClick={this.loginClickHandler}>
          Login
        </MaterialFab>
      </div>
    );
    return (
      <div className={classes.LoginForm}>
        <div className={classes.FormComponents}>
          <div
            style={{
              height: "60px",
              width: "100%",
              backgroundColor: "#313131",
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "7px",
            }}
          >
            <span
              style={{
                fontFamily: "Raleway",
                fontSize: "1.5rem",
                color: "#f1f1f1",
                marginLeft: "20px",
              }}
            >
              {this.props.loginMode ? "Login" : "SignUp"} Form
            </span>
            <span
              style={{
                fontFamily: "Raleway",
                fontSize: "1.5rem",
                color: "#f1f1f1",
                marginLeft: "20px",
              }}
            >
              [{this.props.loginMode ? "login" : "sign-up"}]
            </span>
          </div>
          <div className={classes.FormComponent}>
            <Label text="Username: " />
            <Input
              id="username"
              name="username"
              onChange={this.onChangeUsername}
              value={this.props.username}
              mobile={this.props.mobile}
            />
          </div>
          <div className={classes.FormComponent}>
            <Label text="Password: " />
            <Input
              id="password"
              name="password"
              onChange={this.onChangePassword}
              type="password"
              value={this.props.password}
              mobile={this.props.mobile}
            />
          </div>
          {this.props.loginMode ? null : (
            <div className={classes.FormComponent}>
              <Label text="Cnf Password: " />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                onChange={(event) =>
                  this.props.setConfirmPassword(event.target.value)
                }
                type="password"
                value={this.props.confirmPassword}
                mobile={this.props.mobile}
              />
            </div>
          )}
          {this.props.loginMode ? null : (
            <div className={classes.FormComponent}>
              <div className={classes.SignUpPrompt}>
                <Switch
                  text="Could Create User?"
                  onChange={(event) =>
                    this.handlePermissionChange("createUser", event)
                  }
                  checked={this.state.permissions.createUser}
                />
                <Switch
                  text="Could Add Question?"
                  onChange={(event) =>
                    this.handlePermissionChange("addQuestion", event)
                  }
                  checked={this.state.permissions.addQuestion}
                />
                <Switch
                  text="Could Update Questions?"
                  onChange={(event) =>
                    this.handlePermissionChange("updateQuestion", event)
                  }
                  checked={this.state.permissions.updateQuestion}
                />
                <Switch
                  text="Could Generate Question?"
                  onChange={(event) =>
                    this.handlePermissionChange("generateQuestion", event)
                  }
                  checked={this.state.permissions.generateQuestion}
                />
              </div>
            </div>
          )}

          <div className={classes.FormComponent}>
            <Label text={this.state.loginMessage} />
          </div>
        </div>
        {this.props.loginMode ? signUpPrompt : loginPrompt}
        <MaterialFab
          type="default"
          variant="extended"
          onClick={this.authenticateClickHandler}
        >
          {this.props.loginMode ? "Login" : "SignUp"}
        </MaterialFab>
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
    confirmPassword: state.loginReducer.confirmPassword,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    setUsername: (value) => dispatch(actions.setUsername(value)),
    setPassword: (value) => dispatch(actions.setPassword(value)),
    setActiveUser: (value) => dispatch(actions.setActiveUser(value)),
    setLoginMode: (value) => dispatch(actions.setLoginMode(value)),
    setConfirmPassword: (value) => dispatch(actions.setConfirmPassword(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(withRouter(LoginForm));
