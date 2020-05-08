import React from "react";
import classes from "./FormComponent.css";
const formComponent = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.FormComponent}>
        {props.labelComponent}
        {props.inputComponent}
      </div>
    </div>
  );
};

export default formComponent;
