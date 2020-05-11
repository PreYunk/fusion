import React from "react";
import Input from "../../../Input/Input";
import classes from "./ToolbarDialog.css";
import MathButtons from "../MathButtons/MathButtons";
import Button from "../../../Button/Button";
import AlertDialog from "../../../AlertDialog/AlertDialog";

const ToolbarDialog = (props) => {
  const closeBtn = <Button onClick={props.onClose}>Close</Button>;
  const acceptBtn = (
    <Button onClick={() => props.onAccept(props.dialogType)}>Accept</Button>
  );
  return (
    <div className={classes.Wrapper}>
      <AlertDialog
        dialogTitle="Insert Expression Here"
        isOpen={props.isOpen}
        onClose={props.onClose}
        dialogContentComponent={props.content}
        otherDialogActions={[closeBtn, acceptBtn]}
      />
    </div>
  );
};

export default ToolbarDialog;
