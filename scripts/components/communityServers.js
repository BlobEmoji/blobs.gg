import React from 'react'
import nitro from 'url:../../assets/discord/nitro.png'
import PropTypes from 'prop-types'
import { Guilds } from './material/guilds'
import { shuffleArray } from '../utils'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

function CommunityServers(props) {
  let shuffled
  if (props.emojis.hasOwnProperty('guilds')) {
    shuffled = shuffleArray(props.emojis.guilds)
  }

  return (
    <>
      <Box>
        <Typography variant="h5">Community Blob Servers</Typography>
        <Typography variant="body2">
          To add your Blob Server to our Community Servers section, join the
          official <Link href="https://1.blobs.gg" target="_blank" rel="noreferrer">Blob Emoji server</Link> and message
          our Blob Mail bot.
        </Typography>
        <Typography variant="body2">
          In order to use custom emoji in other Discord Servers you need an
          active
          <img
            className="inline-icon"
            src={nitro}
            alt="Discord Nitro icon"
          />
          <Link href="https://discordapp.com/nitro" target="_blank" rel="noopener">Discord Nitro</Link> subscription.
        </Typography>
      </Box>
      <Guilds guilds={shuffled} slice skeletonCount={9}/>
    </>
  )
}

CommunityServers.propTypes = {
  emojis: PropTypes.object.isRequired,
}

export default CommunityServers
