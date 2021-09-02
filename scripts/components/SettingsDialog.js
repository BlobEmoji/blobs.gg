import Dialog from "@mui/material/Dialog";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from "@mui/styles/makeStyles";
import DialogContent from "@mui/material/DialogContent";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DialogContentText from "@mui/material/DialogContentText";
import TwelveHoursIcon from "react:../../assets/icons/12h.svg";
import TwentyFourHoursIcon from "react:../../assets/icons/24h.svg";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function changeItem(event, value, key, reloadWrapper) {
  if (value == null) {
    return;
  }
  localStorage.setItem(key, value);
  reloadWrapper(Math.round(Math.random() * 100));
}

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem 0",
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
  },
  optionLabel: {
    marginRight: "2.5rem",
    marginBottom: 0,
  },
  optionButtons: {
    marginLeft: "auto",
  },
}));

function SettingsDialog(props) {
  const { open, onClose, handleReload } = props;
  const onCloseWrapper = useCallback(() => onClose(false), [onClose]);
  const handleReloadWrapper = useCallback(
    (randomInt) => handleReload(randomInt),
    [handleReload]
  );
  const classes = useStyles();
  const themeChoice = localStorage.getItem("darkTheme");
  const hourFormatChoice = localStorage.getItem("prefers12Hour");

  function onThemeChange(event, value) {
    changeItem(event, value, "darkTheme", handleReloadWrapper);
  }

  function onHourFormatChange(event, value) {
    changeItem(event, value, "prefers12Hour", handleReloadWrapper);
  }

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={onCloseWrapper}
      aria-labelledby="settings-dialog-title"
    >
      <DialogTitle id="settings-dialog-title">
        Settings
        <IconButton
          aria-label="close"
          onClick={onCloseWrapper}
          className={classes.closeIcon}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <div className={classes.optionContainer}>
          <DialogContentText className={classes.optionLabel}>
            Theme
          </DialogContentText>

          <ToggleButtonGroup
            value={themeChoice}
            exclusive
            onChange={onThemeChange}
            className={classes.optionButtons}
          >
            <Tooltip value="1" title="Dark Theme" arrow>
              <ToggleButton value="1">
                <Brightness2Icon />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="2" title="Light Theme" arrow>
              <ToggleButton value="2">
                <BrightnessHighIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="3" title="Automatic" arrow>
              <ToggleButton value="3">
                <Brightness4Icon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </div>
        <div className={classes.optionContainer}>
          <DialogContentText className={classes.optionLabel}>
            Hour Format
          </DialogContentText>

          <ToggleButtonGroup
            value={hourFormatChoice}
            exclusive
            onChange={onHourFormatChange}
            className={classes.optionButtons}
          >
            <Tooltip value="1" title="12 Hour Format" arrow>
              <ToggleButton value="1">
                <SvgIcon component={TwelveHoursIcon} />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="2" title="24 Hour Format" arrow>
              <ToggleButton value="2">
                <SvgIcon component={TwentyFourHoursIcon} />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="3" title="Automatic" arrow>
              <ToggleButton value="3">
                <AvTimerIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
};

export default SettingsDialog;
