import React from 'react'
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
  const officialEmojis = emojis.hasOwnProperty('groups') ? emojis.groups.blobs : {}
  const communityEmojis = emojis.hasOwnProperty('groups') ? emojis.groups['community-blobs'] : {}
  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className={classes.overHeader}>Over {formattedCount} fun and playful Blob Emoji for
        Discord</Typography>
      {emojis.hasOwnProperty('groups') ? <Search emojis={emojis} /> : null}
      <OfficialServers emojis={officialEmojis} />
      <CommunityServers emojis={communityEmojis} />
    </Container>
  )
}

Homepage.propTypes = {
  formattedCount: PropTypes.string.isRequired,
  emojis: PropTypes.object.isRequired,
}

export default Homepage
