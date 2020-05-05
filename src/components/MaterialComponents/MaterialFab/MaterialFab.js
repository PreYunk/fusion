import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const styles = () => ({
  root: {
    backgroundColor: "#313131",
    color: "#f1f1f1",
    margin: "0 30px",
    fontFamily: "Raleway",
    fontWeight: "700",
    width: "150px",
    transition: "transform 100ms ease-in",
    "&:hover": {
      color: "#313131",
      transform: "scale(1.2)",
    },
  },
  mobile: {
    backgroundColor: "#313131",
    color: "#f1f1f1",
    fontFamily: "Raleway",
    fontWeight: "700",
    transition: "transform 100ms ease-in",
    "&:hover": {
      color: "#313131",
      transform: "scale(1.2)",
    },
  },
});

const materialFab = (props) => {
  const { classes } = props;
  return (
    <Fab
      onClick={props.onClick}
      variant="extended"
      classes={{ root: props.mobile ? classes.mobile : classes.root }}
    >
      {props.children}
    </Fab>
  );
};

export default withStyles(styles)(materialFab);
