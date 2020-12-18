import Dialog from '@material-ui/core/Dialog'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DialogContent from '@material-ui/core/DialogContent'
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { getDefaultHourFormat, getHourFormat, getKeyWrapper, setKeyWrapper, storageAvailable, warn } from '../utils'
import useTheme from '@material-ui/core/styles/useTheme'
import Box from '@material-ui/core/Box'
import DialogContentText from '@material-ui/core/DialogContentText'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import AvTimerIcon from '@material-ui/icons/AvTimer'

const themeIcons = {
  light: <BrightnessLowIcon fontSize="small" />,
  dark: <BrightnessHighIcon fontSize="small" />,
  automated: <Brightness4Icon fontSize="small" />,
}

const hourFormatIcons = {
  half: <AccessAlarmIcon fontSize="small" />,
  full: <AccessTimeIcon fontSize="small" />,
  automated: <AvTimerIcon fontSize="small" />,
}

const oppositeTheme = {
  light: true,
  dark: false,
}

function themeIconHandler(theme) {
  const disabled = !storageAvailable('localStorage')
  let icon

  if (disabled === true) {
    icon = themeIcons.automated
  } else {
    let automated = localStorage.getItem('automated')
    if (automated === null) {
      warn('automated was null. Setting automated')
      localStorage.setItem('automated', 'true')
      automated = true
    } else {
      automated = automated === 'true'
    }

    if (automated === true) {
      icon = themeIcons.automated
    } else {
      icon = themeIcons[theme.palette.type]
    }
  }

  return { themeIcon: icon, disabled: disabled }
}

//TODO - Separate automated from the hour format
function hourFormatIconHandler() {
  const disabled = !storageAvailable('localStorage')
  let icon

  if (disabled === true) {
    icon = hourFormatIcons.automated
  } else {
    let automated = localStorage.getItem('automated')
    if (automated === null) {
      warn('automated was null. Setting automated')
      localStorage.setItem('automated', 'true')
      automated = true
    } else {
      automated = automated === 'true'
    }

    if (automated === true) {
      icon = hourFormatIcons.automated
    } else {
      icon = getHourFormat() ? hourFormatIcons.half : hourFormatIcons.full
    }
  }

  return { hourFormatIcon: icon, disabled: disabled }
}

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  optionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  optionText: {
    marginRight: '2.5rem',
    marginBottom: 0,
  },
  optionButton: {
    marginLeft: 'auto',
    marginRight: '-12px',
    display: 'block',
  },
}))

export default function SettingsDialog(props) {
  const { open, onClose, handleReload } = props
  const onCloseWrapper = useCallback(() => onClose(false), [onClose])
  const handleReloadWrapper = useCallback(
    (randomInt) => handleReload(randomInt),
    [handleReload],
  )
  const classes = useStyles()
  const theme = useTheme()
  const { themeIcon, isThemeDisabled } = themeIconHandler(theme)
  const { hourFormatIcon, isHourFormatDisabled } = hourFormatIconHandler()

  function toggleTheme() {
    if (isThemeDisabled) {
      return
    }
    setKeyWrapper('darkTheme', oppositeTheme[theme.palette.type])
    handleReloadWrapper(Math.round(Math.random() * 100))
  }

  function toggleHourFormat() {
    if (isHourFormatDisabled) {
      return
    }
    const defaultHoursFormat = getDefaultHourFormat()
    const [resIsTime12, resIsTime12LS] = getKeyWrapper('prefers12Hour', defaultHoursFormat)
    setKeyWrapper('prefers12Hour', !resIsTime12)
    handleReloadWrapper(Math.round(Math.random() * 100))
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
      <DialogContent dividers>
        <Box display="flex" alignItems="center" alignContent="space-around">
          <DialogContentText className={classes.optionText}>
            Toggle Theme
          </DialogContentText>
          <IconButton
            aria-label="Toggle Theme"
            className={classes.optionButton}
            disabled={isThemeDisabled}
            onClick={toggleTheme}
          >
            {themeIcon}
          </IconButton>
        </Box>
        <Box className={classes.optionContainer}>
          <DialogContentText className={classes.optionText}>
            Toggle Hour Format
          </DialogContentText>
          <IconButton
            aria-label="Toggle Hour Format"
            className={classes.optionButton}
            disabled={isHourFormatDisabled}
            onClick={toggleHourFormat}
          >
            {hourFormatIcon}
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
}
