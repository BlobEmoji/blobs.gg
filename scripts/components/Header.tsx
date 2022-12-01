// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Server1 from "react:../../assets/server_icons/server1.svg";
import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { css } from "@emotion/react";

const Header = memo(function Header({ handleOpen: handleOpenProps }: {handleOpen: (bool: boolean) => void}) {
  function handleOpen() {
    handleOpenProps(true);
  }

  return (
    <AppBar position="static" color="transparent">
      <Toolbar disableGutters>
        <Avatar
          css={(theme) =>
            css({
              marginRight: theme.spacing(2),
            })
          }
          alt="Blob Emoji Server Icon"
          component={Link}
          to="/"
        >
          <Server1 />
        </Avatar>
        <Typography
          variant="h6"
          css={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
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
        <Divider
          css={{
            margin: "0 0.25rem",
          }}
          orientation="vertical"
          flexItem
        />
        <Tooltip title="Settings" arrow>
          <IconButton onClick={handleOpen}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
