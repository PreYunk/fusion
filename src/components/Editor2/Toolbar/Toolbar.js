import React from "react";
import classes from "./Toolbar.css";
import ToolbarButton from "./ToolbarButtons/ToolbarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faDivide } from "@fortawesome/free-solid-svg-icons";

const Toolbar = (props) => {
  return (
    <div className={classes.ToolbarWrapper}>
      <div className={classes.Toolbar}>
        <ToolbarButton
          type="bold"
          icon={<FontAwesomeIcon icon={faBold} />}
          onClick={(isOn, type) => props.toolbarButtonClicked(isOn, type)}
        />
        <ToolbarButton
          type="math"
          icon={<FontAwesomeIcon icon={faDivide} />}
          onClick={(isOn, type) => props.toolbarButtonClicked(isOn, type)}
        />
      </div>
    </div>
  );
};

export default Toolbar;
