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
import { getDefaultHourFormat, getKeyWrapper, setKeyWrapper, storageAvailable } from '../utils'
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

function themeIconHandler(defaultTheme) {
  const disabled = !storageAvailable('localStorage')
  let theme = getKeyWrapper('darkTheme', defaultTheme)
  let icon
  if (theme[1] === false || disabled) {
    icon = themeIcons.automated
  } else {
    switch (theme[0]) {
    case false:
      icon = themeIcons.light
      break
    case true:
      icon = themeIcons.dark
      break
    default:
      icon = themeIcons.automated
      break
    }
  }

  return { themeIcon: icon, disabled: disabled }
}

function hourFormatIconHandler(defaultFormat) {
  const disabled = !storageAvailable('localStorage')
  let theme = getKeyWrapper('prefers12Hour', defaultFormat)
  let icon
  if (theme[1] === false || disabled) {
    icon = hourFormatIcons.automated
  } else {
    switch (theme[0]) {
    case false:
      icon = hourFormatIcons.full
      break
    case true:
      icon = hourFormatIcons.half
      break
    default:
      icon = hourFormatIcons.automated
      break
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
  const { hourFormatIcon, isHourFormatDisabled } = hourFormatIconHandler(getDefaultHourFormat())

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
    const [resIsTime12] = getKeyWrapper('prefers12Hour', getDefaultHourFormat())
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
