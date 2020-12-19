import React from 'react'
import nitro from 'url:../../assets/discord/nitro.png'
import PropTypes from 'prop-types'
import Guilds from './material/guilds'
import { shuffleArray } from '../utils'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  boxMargin: {
    margin: '2rem 0',
  },
  h5Margin: {
    margin: '0 0 1rem 0',
  },
  inlineIcon: {
    height: '0.8em',
    width: 'auto',
    margin: '0 0.05em 0 0.05em',
  },

})

function CommunityServers(props) {
  const classes = useStyles()
  let shuffled = props.waiting ? [] : shuffleArray(props.emojis.guilds)

  return (
    <>
      <Box className={classes.boxMargin}>
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
      </Box>
      <Guilds guilds={shuffled} slice skeletonCount={9} />
    </>
  )
}

CommunityServers.propTypes = {
  emojis: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired,
}

export default CommunityServers
