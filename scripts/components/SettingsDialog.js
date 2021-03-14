import Dialog from "@material-ui/core/Dialog";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import DialogContentText from "@material-ui/core/DialogContentText";
import TwelveHoursIcon from "../../assets/icons/12h.svg";
import TwentyFourHoursIcon from "../../assets/icons/24h.svg";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

function changeItem(event, value, key, reloadWrapper) {
  if (value == null) { return }
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
              <ToggleButton>
                <Brightness2Icon />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="2" title="Light Theme" arrow>
              <ToggleButton>
                <BrightnessHighIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="3" title="Automatic" arrow>
              <ToggleButton>
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
              <ToggleButton>
                <SvgIcon component={TwelveHoursIcon} />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="2" title="24 Hour Format" arrow>
              <ToggleButton>
                <SvgIcon component={TwentyFourHoursIcon} />
              </ToggleButton>
            </Tooltip>
            <Tooltip value="3" title="Automatic" arrow>
              <ToggleButton>
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
