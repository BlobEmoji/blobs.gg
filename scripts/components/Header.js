import Server1 from "../../assets/server_icons/server1.svg";
import React, { memo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SettingsIcon from "@material-ui/icons/Settings";
import ListIcon from "@material-ui/icons/List";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  mainIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "inherit",
    textDecoration: "none",
  },
  divider: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
  },
}));

const Header = memo(function Header(props) {
  const classes = useStyles();

  function handleOpen() {
    props.handleOpen(true);
  }

  return (
    <AppBar position="static" color="transparent">
      <Toolbar disableGutters>
        <Avatar
          className={classes.mainIcon}
          alt="Blob Emoji Server Icon"
          component={Link}
          to="/"
          imgProps={{ height: 40, width: 40 }}
        >
          <Server1 />
        </Avatar>
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to="/"
        >
          Blob Emoji
        </Typography>
        <Tooltip title="Home" arrow>
          <IconButton component={Link} to="/">
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Emoji Changelog" arrow>
          <IconButton component={Link} to="/changes">
            <ListIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <Tooltip title="Settings" arrow>
          <IconButton onClick={handleOpen}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
});

Header.propTypes = {
  handleOpen: PropTypes.func.isRequired,
};

export default Header;
