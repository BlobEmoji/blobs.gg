import Dialog from '@material-ui/core/Dialog'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { storageAvailable, warn } from '../utils'
import useTheme from '@material-ui/core/styles/useTheme'

const mode = {
  light: <BrightnessLowIcon />,
  dark: <BrightnessHighIcon />,
  automated: <Brightness4Icon />,
}

const oppositeTheme = {
  light: true,
  dark: false,
}

function iconHandler(theme) {
  const disabled = !storageAvailable('localStorage')
  let icon

  if (disabled === true) {
    icon = mode.automated
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
      icon = mode.automated
    } else {
      icon = mode[theme.palette.type]
    }
  }

  return { icon: icon, disabled: disabled }
}

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  centre: {
    margin: '0 auto',
    display: 'block',
  },
}))

export default function SettingsDialog(props) {
  const { open, onClose, handleReload } = props
  const onCloseWrapper = useCallback(() => onClose(false), [onClose])
  const handleReloadWrapper = useCallback(
    (randomInt) => handleReload(randomInt),
    [handleReload]
  )
  const classes = useStyles()
  const theme = useTheme()
  const { icon, disabled } = iconHandler(theme)

  function toggleTheme() {
    if (disabled) {
      return
    }
    localStorage.setItem('theme', oppositeTheme[theme.palette.type].toString())
    localStorage.setItem('automated', 'false')
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
        <Typography variant="h6">Theme</Typography>
        <IconButton
          aria-label="Toggle Mode"
          className={classes.centre}
          disabled={disabled}
          onClick={toggleTheme}
        >
          {icon}
        </IconButton>
      </DialogContent>
    </Dialog>
  )
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
}
