import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';




const alertDialog = (props) => {
    const {classes} = props;
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            fullScreen={props.fullScreen}
        >
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogContentText}
                </DialogContentText>
                {props.dialogContentComponent}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClickButton}>{props.buttonText}</Button>
                {props.otherDialogActions}
            </DialogActions>
        </Dialog>
    );
};

export default alertDialog;