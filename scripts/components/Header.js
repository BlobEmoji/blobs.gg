import server1 from 'url:../../assets/server_icons/server1.svg'
import React, { useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SettingsIcon from '@material-ui/icons/Settings'
import ListIcon from '@material-ui/icons/List'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'
import { Settings } from '../changes'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  mainIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function SettingsButton(props) {
  const handleOpen = useCallback(() => props.handleOpen(true), [
    props.handleOpen,
  ])

  return (
    <IconButton onClick={handleOpen}>
      <SettingsIcon />
    </IconButton>
  )
}

SettingsButton.propTypes = {
  handleOpen: PropTypes.func.isRequired,
}

export default function Header() {
  const classes = useStyles()

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Avatar
          src={server1}
          className={classes.mainIcon}
          alt="Blob Emoji Server Icon"
        />
        <Typography variant="h6" className={classes.title}>
          Blob Emoji
        </Typography>
        <Tooltip title="Home" arrow>
          <IconButton component={Link} href="/">
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Emoji Changelog" arrow>
          <IconButton component={Link} href="/changes">
            <ListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" arrow>
          <span>
            <Settings.Consumer>
              {({ handleOpen }) => <SettingsButton handleOpen={handleOpen} />}
            </Settings.Consumer>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
