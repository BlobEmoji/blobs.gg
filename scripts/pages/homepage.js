import React, { useState } from 'react'
import OfficialServers from '../components/officialServers'
import CommunityServers from '../components/communityServers'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Search from '../components/Search'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  overHeader: {
    textAlign: 'center',
    margin: '2em 0',
  },
})

function Homepage(props) {
  const { emojis, formattedCount } = props
  const [waiting, setWaiting] = useState(true)
  const officialEmojis = emojis.groups.blobs
  const communityEmojis = emojis.groups['community-blobs']
  const classes = useStyles()

  function communityRender() {
    setWaiting(false)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className={classes.overHeader}>
        {formattedCount} fun and playful Blob Emoji for Discord
      </Typography>
      <Search emojis={emojis} />
      <OfficialServers emojis={officialEmojis} communityRender={communityRender} />
      <CommunityServers emojis={communityEmojis} waiting={waiting} />
    </Container>
  )
}

Homepage.propTypes = {
  formattedCount: PropTypes.string.isRequired,
  emojis: PropTypes.object.isRequired,
}

export default Homepage
