import Server1 from "react:../../assets/server_icons/server1.svg";
import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import makeStyles from "@mui/styles/makeStyles";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

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
    margin: "0 0.25rem",
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
