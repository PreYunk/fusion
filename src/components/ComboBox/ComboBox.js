import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    root: {
        backgroundColor: 'aquamarine',
        width: '150px',
    }
};

const comboBox = (props) => {


    const {classes} = props;
    const menuItems = props.data.map(menuItemObj => {
        return <MenuItem value={menuItemObj.value} >{menuItemObj.label}</MenuItem>;
    });
    console.log(menuItems);
    return (
      <Select value={props.value}
              classes={{root: classes.root}}
              onChange={props.onChange}
      >
          {menuItems}
      </Select>
    );
};

export default withStyles(styles)(comboBox);