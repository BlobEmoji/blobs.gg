import React, { Component } from 'react'
import server1 from 'url:../../assets/server_icons/server1.svg'
import OfficialServers from '../components/officialServers'
import CommunityServers from '../components/communityServers'
import PropTypes from 'prop-types'

class Homepage extends Component {
  render() {
    return (
      <main>
        <nav>
          <h1>
            <img alt="Blob Emoji server icon" src={server1}/>
            Blob Emoji
          </h1>
          <div className="links"/>
        </nav>
        <header>
          <p className="lead">
            Over <span id="emoji-count">{this.props.formattedCount}</span> fun and playful Blob Emoji for Discord
          </p>
        </header>
        {/*React will be mounted into this DOM node.*/}
        <section id="search" hidden/>
        <OfficialServers data={this.props.data}/>
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
        <CommunityServers data={this.props.data}/>
      </main>
    )
  }
}

Homepage.propTypes = {
  data: PropTypes.object.isRequired,
  formattedCount: PropTypes.number.isRequired
}

export default Homepage
