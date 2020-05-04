import React from "react";
import classes from "./RowGroupedThree.css";

const rowGroupedThree = (props) => {
  return (
    <div className={classes.RowGroupedThree}>
      <div className={classes.wrapper}>
        {props.firstComp}
        {props.secondComp}
        {props.thirdComp}
      </div>
    </div>
  );
};

export default rowGroupedThree;
