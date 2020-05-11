import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexFlow: "column",
    marginBottom: "30px",
  },
  headerStyle: {
    color: "#313131",
    fontSize: theme.typography.pxToRem(25),
  },
  listRoot450: {
    maxHeight: "450px",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    color: "#313131",
    marginTop: "20px",
    border: "1px solid #313131",
  },
  listRoot100: {
    maxHeight: "150px",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    color: "#313131",
    marginTop: "20px",
    border: "1px solid #313131",
  },
  selectedListItem: {
    backgroundColor: "#313131 !important",
    color: "#ffffff",
  },
});

const list = (props) => {
  const { classes } = props;
  const listItems = props.listData.map((listItem, index) => {
    return (
      <ListItem
        button
        selected={listItem.selected}
        classes={{ selected: classes.selectedListItem }}
        onClick={(event) => listItem.onClick(event, listItem.label, index)}
      >
        {listItem.label}
      </ListItem>
    );
  });

  return (
    <div className={classes.container}>
      <span className={classes.headerStyle}>{props.header}</span>
      <List
        component="ul"
        classes={{
          root: props.smallList ? classes.listRoot100 : classes.listRoot450,
        }}
      >
        {listItems}
      </List>
    </div>
  );
};

export default withStyles(styles)(list);
