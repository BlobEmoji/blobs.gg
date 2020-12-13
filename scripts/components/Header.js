import server1 from 'url:../../assets/server_icons/server1.svg'
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
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import LanguageIcon from '@material-ui/icons/Language'

const useStyles = makeStyles((theme) => ({
  mainIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Header(props) {
  const { i18n, t, tReady } = props
  const classes = useStyles()

  function handleOpen() {
    props.handleOpen(true)
  }

  function toggleLang() {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Avatar
          src={server1}
          className={classes.mainIcon}
          alt={`Blob Emoji ${t('Server Icon')}`}
        />
        <Typography variant="h6" className={classes.title}>
          Blob Emoji
        </Typography>
        {tReady && <>
          <Tooltip title={t('Home')} arrow>
            <IconButton component={Link} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Emoji Changelog')} arrow>
            <IconButton component={Link} to="/changes">
              <ListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Settings')} arrow>
            <IconButton onClick={handleOpen}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </>}
        <Tooltip title="Toggle FR" arrow>
          <IconButton onClick={toggleLang}>
            <LanguageIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  tReady: PropTypes.bool.isRequired,
}

export default withTranslation()(Header)
