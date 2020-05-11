import React from "react";
import classes from "./MathButton.css";

const MathButton = (props) => {
  return (
    <div className={classes.MathButton}>
      <div onClick={() => props.onClick(props.expression)}>
        {props.children}
      </div>
    </div>
  );
};

export default MathButton;
