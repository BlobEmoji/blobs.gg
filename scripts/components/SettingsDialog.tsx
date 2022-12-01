import Dialog from "@mui/material/Dialog";
import { useCallback, MouseEvent } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DialogContentText from "@mui/material/DialogContentText";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TwelveHoursIcon from "react:../../assets/icons/12h.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TwentyFourHoursIcon from "react:../../assets/icons/24h.svg";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SettingsDialogProps } from "./SettingsDialog.types";

function changeItem(value: string, key: string, reloadWrapper: (randomInt: number) => void) {
  if (value == null) {
    return;
  }
  localStorage.setItem(key, value);
  reloadWrapper(Math.round(Math.random() * 100));
}

const DialogOptionContainer = styled.div({
  display: "flex",
  alignItems: "center",
});

const DialogOptionLabel = styled(DialogContentText)({
  marginRight: "2.5rem",
  marginBottom: "0",
});

const toggleButtonGroupStyle = {
  marginLeft: "auto",
};

const StyledIconWrapper = styled.div({ height: "24px", width: "48px", marginTop: 12, marginBottom: 12 });

function SettingsDialog(props: SettingsDialogProps) {
  const { open, onClose, handleReload } = props;
  const onCloseWrapper = useCallback(() => onClose(false), [onClose]);
  const handleReloadWrapper = useCallback(
    (randomInt) => handleReload(randomInt),
    [handleReload]
  );
  const themeChoice = localStorage.getItem("darkTheme");
  const hourFormatChoice = localStorage.getItem("prefers12Hour");

  function onThemeChange(_event: MouseEvent<HTMLElement>, value: string) {
    changeItem(value, "darkTheme", handleReloadWrapper);
  }

  function onHourFormatChange(_event: MouseEvent<HTMLElement>, value: string) {
    changeItem(value, "prefers12Hour", handleReloadWrapper);
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
          css={(theme) =>
            css({
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
            })
          }
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem 0",
        }}
      >
        <DialogOptionContainer>
          <DialogOptionLabel>Theme</DialogOptionLabel>

          <ToggleButtonGroup
            value={themeChoice}
            exclusive
            onChange={onThemeChange}
            css={toggleButtonGroupStyle}
          >
            <ToggleButton value="1" css={{ padding: 0 }}>
              <Tooltip title="Dark Theme" arrow>
                <StyledIconWrapper>
                  <Brightness2Icon/>
                </StyledIconWrapper>
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="2" css={{ padding: 0 }}>
              <Tooltip title="Light Theme" arrow>
                <StyledIconWrapper>
                  <BrightnessHighIcon/>
                </StyledIconWrapper>
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="3" css={{ padding: 0 }}>
              <Tooltip title="Automatic" arrow>
                <StyledIconWrapper>
                  <Brightness4Icon/>
                </StyledIconWrapper>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogOptionContainer>
        <DialogOptionContainer>
          <DialogOptionLabel>Hour Format</DialogOptionLabel>

          <ToggleButtonGroup
            value={hourFormatChoice}
            exclusive
            onChange={onHourFormatChange}
            css={toggleButtonGroupStyle}
          >
            <ToggleButton value="1">
              <Tooltip title="12 Hour Format" arrow>
                <SvgIcon component={TwelveHoursIcon}/>
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="2">
              <Tooltip title="24 Hour Format" arrow>
                <SvgIcon component={TwentyFourHoursIcon}/>
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="3">
              <Tooltip title="Automatic" arrow>
                <AvTimerIcon/>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogOptionContainer>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
