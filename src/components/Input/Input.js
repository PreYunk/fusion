import React from "react";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    border: "1px solid #313131",
    backgroundColor: "#f1f1f1",
    width: "300px",
    borderRadius: "50px",
  },
  mobile: {
    width: "100px",
    border: "1px solid #313131",
    backgroundColor: "#f1f1f1",
  },
};

const input = (props) => {
  const { classes } = props;
  return (
    <Input
      disableUnderline={true}
      classes={{ root: props.mobile ? classes.mobile : classes.root }}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      type={props.type ? props.type : "text"}
      inputProps={{
        style: { textAlign: "center" },
      }}
    />
  );
};

export default withStyles(styles)(input);
