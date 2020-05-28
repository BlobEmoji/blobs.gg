import server1 from '../../assets/server_icons/server1.svg'
import React from 'react'
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

const useStyles = makeStyles((theme) => ({
  mainIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

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
        <Tooltip title="Home Page" arrow>
          <IconButton component={Link} href="/index.html">
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Changelog Page" arrow>
          <IconButton component={Link} href="/changes.html">
            <ListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" arrow>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
