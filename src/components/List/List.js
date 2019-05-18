import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    container: {
        display: 'flex',
        flexFlow: 'column',
        margin: '100px 200px 100px 100px'
    },
    headerStyle: {
        color: '#52E5AA',
        fontSize: theme.typography.pxToRem(25)
    },
    listRoot: {
        maxHeight: '500px',
        width: 'auto',
        overflow: 'auto',
        backgroundColor: '#52E5AA',
        borderRadius: '6px',
        color: '#670A67',
        marginTop: '20px'
    },
    selectedListItem: {
        backgroundColor: '#670A67 !important',
        color: '#52E5AA'
    }
});


const list = (props) => {

    const {classes} = props;
    const listItems = props.listData.map((listItem, index) => {
        return (
            <ListItem
                button
                selected={listItem.selected}
                classes={{selected: classes.selectedListItem}}
                onClick={(event) => listItem.onClick(event, listItem.label, index)}
            >
                {listItem.label}
            </ListItem>
        );
    });


    return (
        <div className={classes.container}>
            <span className={classes.headerStyle}>{props.header}</span>
            <List component='ul'
                  classes={{root: classes.listRoot}}
            >
                {listItems}
            </List>
        </div>

    );
};

export default withStyles(styles)(list);