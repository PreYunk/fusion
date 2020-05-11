import React, { useState } from "react";
import classes from "./MathButtons.css";
import MathButton from "./MathButton/MathButton";
import { Context, Node } from "react-mathjax2";

const MathButtons = (props) => {
  return props.visible ? (
    <div className={classes.MathButtons}>
      <Context input="tex">
        <>
          <MathButton
            expression={"\\frac{}{}"}
            onClick={(exp) => props.onMathButtonClicked(exp)}
          >
            <Node inline>{"\\frac{x}{y}"}</Node>
          </MathButton>
          <MathButton
            expression={"\\times"}
            onClick={(exp) => props.onMathButtonClicked(exp)}
          >
            <Node inline>{"\\times"}</Node>
          </MathButton>
          <MathButton
            expression={"\\sqrt{}"}
            onClick={(exp) => props.onMathButtonClicked(exp)}
          >
            <Node inline>{"\\sqrt{x}"}</Node>
          </MathButton>
          <MathButton
            expression={"\\int"}
            onClick={(exp) => props.onMathButtonClicked(exp)}
          >
            <Node inline>{"\\int"}</Node>
          </MathButton>
          <MathButton
            expression={"\\sqrt[3]{}"}
            onClick={(exp) => props.onMathButtonClicked(exp)}
          >
            <Node inline>{"\\sqrt[3]{x}"}</Node>
          </MathButton>
        </>
      </Context>
    </div>
  ) : null;
};

export default MathButtons;
