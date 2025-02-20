import React, { useState } from "react";
import classes from "./Button.css";

const Button = (props) => {
  return (
    <button
      className={classes.Button}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
