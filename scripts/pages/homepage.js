import React, { Component } from 'react'
import OfficialServers from '../components/officialServers'
import CommunityServers from '../components/communityServers'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Search from '../components/Search'

class Homepage extends Component {
  render() {
    const { emojis } = this.props
    console.log(10, emojis)
    const officialEmojis = emojis.hasOwnProperty('groups') ? emojis.groups.blobs : {}
    const communityEmojis = emojis.hasOwnProperty('groups') ? emojis.groups['community-blobs'] : {}

    return (
      <Container maxWidth="md">
        <Typography variant="h5">Over {this.props.formattedCount} fun and playful Blob Emoji for Discord</Typography>
        {emojis.hasOwnProperty('groups') ? <Search emojis={emojis} /> : null}
        <OfficialServers emojis={officialEmojis} />
        <section id="downloads-licensing">
          <p>
            All blobs that are uploaded to official Blob Emoji servers are
            licensed under the
            <a href="http://www.apache.org/licenses/LICENSE-2.0.html"
            >Apache License 2.0</a
            >, the same license that
            <a href="https://www.google.com/get/noto/help/emoji/">Noto Emoji</a>
            by Google are licensed under.
          </p>
          <p>
            All blobs from the official servers can be downloaded
            <a href="https://blobs.gg/blobs.zip">here</a>. Make sure to follow the
            license.
          </p>
        </section>
        <CommunityServers emojis={communityEmojis} />
      </Container>
    )
  }
}

Homepage.propTypes = {
  formattedCount: PropTypes.string.isRequired,
  emojis: PropTypes.object.isRequired,
}

export default Homepage
