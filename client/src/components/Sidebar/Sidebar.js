import React from "react";
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    top: theme.spacing.unit * 8,
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 8,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  }
});

const Sidebar = props => {
  const { open, classes } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        )
      }}
      open={open}
    >
      <List>
        <Link style={{textDecoration: 'none'}} to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link style={{textDecoration: 'none'}} to="/hospital-registration">
          <ListItem button>
            <ListItemIcon>
              <LocalHospitalIcon /> 
            </ListItemIcon>
            <ListItemText primary="Hospital Registration" />
          </ListItem>
        </Link>
        <Link style={{textDecoration: 'none'}} to="/donor-registration">
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Donor Registration" />
          </ListItem>
        </Link>
        <Link style={{textDecoration: 'none'}} to="/donor-search">
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Donor Search" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
