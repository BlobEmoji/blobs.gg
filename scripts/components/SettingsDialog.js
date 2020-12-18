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
import Tooltip from '@material-ui/core/Tooltip'

const themeIcons = {
  false: <BrightnessLowIcon fontSize="small" />,
  true: <BrightnessHighIcon fontSize="small" />,
  automated: <Brightness4Icon fontSize="small" />,
}

const hourFormatIcons = {
  true: <AccessAlarmIcon fontSize="small" />,
  false: <AccessTimeIcon fontSize="small" />,
  automated: <AvTimerIcon fontSize="small" />,
}

const oppositeTheme = {
  light: true,
  dark: false,
}

function iconHandler(key, icons) {
  const disabled = !storageAvailable('localStorage')
  let icon

  if (disabled === true) {
    icon = icons.automated
  } else {
    const value = localStorage.getItem(key)
    switch (value) {
    case '3': {
      icon = icons.automated
      break
    }
    case '2': {
      icon = icons.false
      break
    }
    case '1': {
      icon = icons.true
      break
    }
    // eslint-disable-next-line no-empty
    default: {
    }
    }
  }
  return icon
}

function getTooltipString(key) {
  const value = localStorage.getItem(key)
  let string = 'Toggle to '
  
  if (key === 'darkTheme') {
    switch (value) {
    case '2':
      return string + 'Dark Theme'
    case '1':
      return string + 'Light Theme'
    default:
      return 'Toggle Theme'
    }
  }

  if (key === 'prefers12Hour') {
    switch (value) {
    case '2':
      return string + '12h Format'
    case '1':
      return string + '24h Format'
    default:
      return 'Toggle Hour Format'
    }
  }

  return ''
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
  const themeIcon = iconHandler('darkTheme', themeIcons)
  const hourFormatIcon = iconHandler('prefers12Hour', hourFormatIcons)
  const themeTooltip = getTooltipString('darkTheme')
  const hourFormatTooltip = getTooltipString('prefers12Hour')

  function toggleTheme() {
    setKeyWrapper('darkTheme', oppositeTheme[theme.palette.type])
    handleReloadWrapper(Math.round(Math.random() * 100))
  }

  function toggleHourFormat() {
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
          <Tooltip title={themeTooltip} arrow>
            <IconButton
              aria-label={themeTooltip}
              className={classes.optionButton}
              onClick={toggleTheme}
            >
              {themeIcon}
            </IconButton>
          </Tooltip>
        </Box>
        <Box className={classes.optionContainer}>
          <DialogContentText className={classes.optionText}>
            Toggle Hour Format
          </DialogContentText>
          <Tooltip title={hourFormatTooltip} arrow>
            <IconButton
              aria-label={hourFormatTooltip}
              className={classes.optionButton}
              onClick={toggleHourFormat}
            >
              {hourFormatIcon}
            </IconButton>
          </Tooltip>
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
