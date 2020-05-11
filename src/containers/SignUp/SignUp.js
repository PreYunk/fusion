import React, { Component } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from "../../components/FormComponent/FormComponent";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import axios from "axios";

import classes from "./SignUp.css";
import Button from "../../components/Button/Button";

export default class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confPassword: "",
    signedUp: true,
    message: "Hold On...",
    toDisplay: false,
  };
  constructor(props) {
    super(props);
    axios
      .get("/getControls?name=developer")
      .then((res) => {
        if (!res.data.data.controls.enableULogin) {
          this.setState({ signedUp: true, message: "Permission Denied" });
        } else {
          this.setState({ signedUp: false });
        }
      })
      .catch((err) => console.log(err));
  }

  usernameChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  passwordChangeHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  cnfPasswordChangeHandler = (event) => {
    this.setState({ confPassword: event.target.value });
  };

  signUpBtnClickHandler = () => {
    if (this.state.password !== this.state.confPassword) {
      this.setState({
        signedUp: true,
        message: "Passwords dont match. Reload to continue",
      });
      return;
    }
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confPassword === ""
    ) {
      this.setState({
        signedUp: true,
        message: "Fields can't be empty",
      });
      return;
    }
    if (/[A-Z]/.test(this.state.username)) {
      this.setState({
        signedUp: true,
        message: "Username must be in small letters",
      });
      return;
    }
    this.setState({ signedUp: true, message: "Please Wait" });
    axios
      .post("/createUser", {
        username: this.state.username.trim(),
        password: this.state.password,
        permissions: {
          createUser: false,
          addQuestion: true,
          updateQuestion: false,
          generateQuestion: true,
        },
        universal: true,
      })
      .then((res) => {
        this.setState({ message: res.data.message });
      })
      .catch((err) => this.setState({ message: err }));
  };
  render() {
    return (
      <div className={classes.SignUpWrapper}>
        {this.state.signedUp ? (
          <h1 style={{ textAlign: "center" }}>{this.state.message}</h1>
        ) : (
          <>
            <div className={classes.SignUpComponents}>
              <div className={classes.Header}>
                <h2>Enter your details to signUp</h2>
              </div>
              <FormComponent
                labelComponent={<Label text="Username" />}
                inputComponent={
                  <Input
                    mobile={this.props.mobile}
                    value={this.state.username}
                    onChange={this.usernameChangeHandler}
                  />
                }
              />
              <FormComponent
                labelComponent={<Label text="Password" />}
                inputComponent={
                  <Input
                    type="password"
                    mobile={this.props.mobile}
                    value={this.state.password}
                    onChange={this.passwordChangeHandler}
                  />
                }
              />
              <FormComponent
                labelComponent={<Label text="Cnf Password" />}
                inputComponent={
                  <Input
                    type="password"
                    mobile={this.props.mobile}
                    value={this.state.confPassword}
                    onChange={this.cnfPasswordChangeHandler}
                  />
                }
              />
              <span>
                <FontAwesomeIcon icon={faInfo} />
                &nbsp; make sure to remember your password.
              </span>
            </div>
            <Button onClick={this.signUpBtnClickHandler}>SignUp</Button>
          </>
        )}
      </div>
    );
  }
}
