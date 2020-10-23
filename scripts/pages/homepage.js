import React, { Component } from 'react'
import server1 from 'url:../../assets/server_icons/server1.svg'
import OfficialServers from '../components/officialServers'
import CommunityServers from '../components/communityServers'

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
            <span id="emoji-count">Over 400</span> fun and playful Blob Emoji for Discord
          </p>
        </header>
        {/*React will be mounted into this DOM node.*/}
        <section id="search" hidden/>
        <OfficialServers/>
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
        <CommunityServers/>
      </main>
    )
  }
}

export default Homepage
