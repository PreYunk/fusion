import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    marginLeft: theme.spacing(3),
  },
}));

const AlertDialog = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
    >
      <DialogTitle>
        {props.dialogTitle}

        {props.buttonText ? (
          <Button
            variant="contained"
            classes={{ root: classes.fab }}
            onClick={props.onClickButton}
          >
            {props.buttonText}
          </Button>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{props.dialogContentText}</DialogContentText>
        {props.dialogContentComponent}
      </DialogContent>
      <DialogActions>{props.otherDialogActions}</DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
