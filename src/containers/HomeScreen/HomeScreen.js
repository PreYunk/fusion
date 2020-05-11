import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import classes from "./HomeScreen.css";
import * as actions from "../../store/actions/index";

class HomeScreen extends Component {
  startButtonClicked = () => {
    this.props.history.push("start");
  };

  render() {
    return (
      <div className={classes.HomeScreen}>
        <Logo />
        <Button onClick={this.startButtonClicked}>Start</Button>
      </div>
    );
  }
}

export default withRouter(HomeScreen);
