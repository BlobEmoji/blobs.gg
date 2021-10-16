import Dialog from "@mui/material/Dialog";
import { useCallback } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
import { css } from "@emotion/react";

function changeItem(event, value, key, reloadWrapper) {
  if (value == null) {
    return;
  }
  localStorage.setItem(key, value);
  reloadWrapper(Math.round(Math.random() * 100));
}

const optionContainerStyle = css`
  display: flex;
  align-items: center;
`;

const optionLabelStyle = css`
  margin-right: 2.5rem;
  margin-bottom: 0;
`;

const optionButtonsStyle = css`
  margin-left: auto;
`;

function SettingsDialog(props) {
  const { open, onClose, handleReload } = props;
  const onCloseWrapper = useCallback(() => onClose(false), [onClose]);
  const handleReloadWrapper = useCallback(
    (randomInt) => handleReload(randomInt),
    [handleReload]
  );
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
          css={(theme) => css`
            position: absolute;
            right: ${theme.spacing(1)};
            top: ${theme.spacing(1)};
          `}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem 0;
        `}
      >
        <div css={optionContainerStyle}>
          <DialogContentText css={optionLabelStyle}>
            Theme
          </DialogContentText>

          <ToggleButtonGroup
            value={themeChoice}
            exclusive
            onChange={onThemeChange}
            css={optionButtonsStyle}
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
        <div css={optionContainerStyle}>
          <DialogContentText css={optionLabelStyle}>
            Hour Format
          </DialogContentText>

          <ToggleButtonGroup
            value={hourFormatChoice}
            exclusive
            onChange={onHourFormatChange}
            css={optionButtonsStyle}
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
