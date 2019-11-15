import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  root2: {
    marginBottom: 30,
    marginTop: 30,
  },
}));

export default function SimpleList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar> */}
        <div className={classes.root2}>
        <ListItemText>
          <>{"date"}</>
          <br></br>
          <>{"time"}</>
          <br></br>
          <>{"name"}</>
          <br></br>
          <>{"street"}</>
          <br></br>
          <>{"city"}, {"state"} {"zip"}</>
          <br></br>
          <>{"phone"}</>
        </ListItemText>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar> */}
        <div className={classes.root2}>
        <ListItemText>
          <>{"date"}</>
          <br></br>
          <>{"time"}</>
          <br></br>
          <>{"name"}</>
          <br></br>
          <>{"street"}</>
          <br></br>
          <>{"city"}, {"state"} {"zip"}</>
          <br></br>
          <>{"phone"}</>
        </ListItemText>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar> */}
        <div className={classes.root2}>
        <ListItemText>
          <>{"date"}</>
          <br></br>
          <>{"time"}</>
          <br></br>
          <>{"name"}</>
          <br></br>
          <>{"street"}</>
          <br></br>
          <>{"city"}, {"state"} {"zip"}</>
          <br></br>
          <>{"phone"}</>
        </ListItemText>
        </div>
      </ListItem>
    </List>
  );
}
