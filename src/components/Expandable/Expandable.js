import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        backgroundColor: '#bdbcbf',
        boxShadow: 'none',
        fontWeight: '700',


    },
    rootDiv: {
      width: '100%',
        margin: '20px 0',
    },
    heading: {
        fontSize: theme.typography.pxToRem(25),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: '#313131',
        fontFamily: 'Raleway'
    },
    details: {
        fontSize: theme.typography.pxToRem(20),
        fontFamily: 'Raleway',
        color: '#313131'
    }
});

const expandable = (props) => {
    const {classes} = props;
    return (
        <div className={classes.rootDiv}>
            <ExpansionPanel className={classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    {/*<Typography className={classes.heading}>{props.expandableSummary}</Typography>*/}
                    {props.expandableSummaryComponent}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    {props.children}
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    {props.expandableActions}
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
};

export default withStyles(styles)(expandable);