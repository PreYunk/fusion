import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

const styles = () => ({
   root: {
       backgroundColor: '#52E5AA',
       color: '#670A67',
       margin : '0 30px',
       fontFamily: 'Raleway',
       fontWeight: '700',
       width: '150px'
   }
});

const materialFab = (props) => {
    const {classes} = props;
    return (
        <Fab variant='extended' classes={{root: classes.root}}>{props.children}</Fab>
    )
};

export default withStyles(styles)(materialFab);