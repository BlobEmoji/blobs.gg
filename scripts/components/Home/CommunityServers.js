import React from 'react'
import nitro from 'url:../../../assets/discord/nitro.png'
import PropTypes from 'prop-types'
import Guilds from './Guilds'
import { shuffleArray } from '../../utils'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'

const useStyles = makeStyles((theme) => ({
  divMargin: {
    margin: '2rem 0 1rem 0',
  },
  h5Margin: {
    margin: '0 0 1rem 0',
  },
  inlineIcon: {
    height: '0.8em',
    width: 'auto',
    margin: '0 0.25em',
    filter: theme.palette.type === 'light' && 'invert(1)',
  },
}))

function CommunityServers(props) {
  const theme = useTheme()
  const classes = useStyles(theme)
  let shuffled = props.waiting ? [] : shuffleArray(props.emojis.guilds)

  return (
    <>
      <div className={classes.divMargin}>
        <Typography variant="h5" className={classes.h5Margin}>Community Blob Servers</Typography>
        <Typography variant="body2">
          To add your Blob Server to our Community Servers section, join the
          official <Link href="https://1.blobs.gg" target="_blank" rel="noreferrer">Blob Emoji server</Link> and message
          our Blob Mail bot.
        </Typography>
        <Typography variant="body2">
          In order to use custom emoji in other Discord Servers you need an
          active
          <img
            className={classes.inlineIcon}
            src={nitro}
            alt="Discord Nitro icon"
          />
          <Link href="https://discord.com/nitro" target="_blank" rel="noopener">Discord Nitro</Link> subscription.
        </Typography>
      </div>
      <Guilds guilds={shuffled} slice skeletonCount={9} />
    </>
  )
}

CommunityServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired,
}

export default CommunityServers
