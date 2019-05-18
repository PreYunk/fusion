import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent} from "@material-ui/core";
import {DialogTitle} from "@material-ui/core";
import {DialogActions} from "@material-ui/core";
import {DialogContentText} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";

const addTypeDialog = (props) => {
    return (
        <Dialog open={props.isOpen}
                onClose={props.onClose}
                disableBackdropClick={false}
        >
            <DialogTitle>Add Type</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the name of question type</DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    value={props.addTypeInputValue}
                    onChange={props.addTypeInputChanged}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.buttonClicked}>SAVE</Button>
            </DialogActions>
        </Dialog>
    );
};

export default addTypeDialog;