import React from "react";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    backgroundColor: "#ffffff",
    width: "300px",
  },
  mobile: {
    width: "100px",

    backgroundColor: "#ffffff",
  },
};

const input = React.forwardRef((props, ref) => {
  const { classes } = props;
  return (
    <Input
      required={props.required}
      inputRef={ref}
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
});

export default withStyles(styles)(input);
