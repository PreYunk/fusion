import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


const formDialog = (props) => {
    return (
        <Dialog open={props.isOpen}
                disableBackdropClick={false}
                onClose={props.onClose}>
            <DialogTitle>
                {props.dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogContentText}
                </DialogContentText>
                {/*Must be wrapped in a div*/}
                {props.formComponent}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.okButtonClicked} color='primary'>
                    {props.okButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default formDialog;