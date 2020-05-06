import React, { useState } from "react";
import classes from "./ToolbarButton.css";

const ToolbarButton = (props) => {
  const [isOn, toggleState] = useState(false);

  const buttonClicked = (isOn) => {
    toggleState((isOn = !isOn));
    props.onClick(isOn, props.type);
  };

  const classNames = [classes.ToolbarButton];
  classNames.push(isOn ? classes.ToolbarButtonOn : classes.ToolbarButtonOff);

  return (
    <div
      className={classNames.join(" ")}
      onClick={() => {
        buttonClicked(isOn);
      }}
    >
      {props.icon}
    </div>
  );
};

export default ToolbarButton;
