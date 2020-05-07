import React, { Component } from "react";
import classes from "./StartPage.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MaterialFab from "../../components/MaterialComponents/MaterialFab/MaterialFab";
import * as actions from "../../store/actions/index";
import Switch from "../../components/Switch/Switch";
import axios from "axios";

class StartPage extends Component {
  state = { enableULogin: false, changingControl: false };

  constructor(props) {
    super(props);
    this.setState({ changingControl: true });
    axios
      .get("/getControls?name=developer")
      .then((res) =>
        this.setState({
          enableULogin: res.data.data.controls.enableULogin,
          changingControl: false,
        })
      )
      .catch((err) => console.log(err));
  }

  logoutClickHandler = () => {
    localStorage.removeItem("token");

    const initialActiveUser = {
      userId: null,
      username: " ",
      permissions: {
        createUser: false,
        addQuestion: false,
        updateQuestion: false,
        generateQuestion: false,
      },
    };
    this.props.setActiveUser(initialActiveUser);
    this.props.setLoginMode(true);
    this.props.history.push("/login");
  };
  createUserClickHandler = () => {
    this.props.setLoginMode(false);
    this.props.history.push("/login");
  };
  loginSwitchChangeHandler = (event) => {
    console.log(event.target.checked);
    this.setState({ enableULogin: event.target.checked });
    this.setState({ changingControl: true });
    axios
      .put("/updateControls", {
        name: "developer",
        controls: {
          enableULogin: event.target.checked,
        },
      })
      .then((res) => this.setState({ changingControl: false }))
      .catch((err) => console.log(err));
  };

  render() {
    const activeUser = this.props.activeUser;
    const classNames = [];
    classNames.push(classes.CenteredDiv);
    classNames.push(classes.Options);
    return (
      <div className={classes.StartPage}>
        <nav className={classes.NavBar}>
          <span className={classes.NavText}>
            Hi there, {activeUser.username}
          </span>
          <div className={classes.NavControls}>
            {activeUser.permissions.createUser ? (
              <MaterialFab
                variant="extended"
                onClick={this.createUserClickHandler}
              >
                Create User
              </MaterialFab>
            ) : null}
            {activeUser.permissions.accessBeta ? (
              this.state.changingControl ? (
                <span style={{ color: "white" }}>Please Wait..</span>
              ) : (
                <Switch
                  white
                  text="Enable Universal Login"
                  checked={this.state.enableULogin}
                  onChange={this.loginSwitchChangeHandler}
                />
              )
            ) : null}

            <MaterialFab variant="extended" onClick={this.logoutClickHandler}>
              Log out
            </MaterialFab>
          </div>
        </nav>
        <div className={classNames.join(" ")}>
          <Link to="/start/add">Add</Link>
          <Link to="/start/view">View</Link>
          <Link to="/start/generate">Generate</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.loginReducer.activeUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginMode: (value) => dispatch(actions.setLoginMode(value)),
    setActiveUser: (value) => dispatch(actions.setActiveUser(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StartPage));
