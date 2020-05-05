import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    border: "1px solid #313131",
    backgroundColor: "#f1f1f1",
    width: "150px",
    borderRadius: "50px",
    textAlign: "center",
    padding: "10px",
  },
  mobile: {
    border: "1px solid #313131",
    backgroundColor: "#f1f1f1",
    width: "150px",
    borderRadius: "0px",
    textAlign: "center",
  },
};

const comboBox = (props) => {
  const { classes } = props;
  const menuItems = props.data.map((menuItemObj) => {
    return <MenuItem value={menuItemObj.value}>{menuItemObj.label}</MenuItem>;
  });
  return (
    <Select
      value={props.value}
      disableUnderline={true}
      classes={{ root: props.mobile ? classes.mobile : classes.root }}
      onChange={props.onChange}
      variant={"outlined"}
    >
      {menuItems}
    </Select>
  );
};

export default withStyles(styles)(comboBox);
