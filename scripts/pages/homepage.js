import React, { Component } from 'react'
import server1 from 'url:../../assets/server_icons/server1.svg'
import nitro from 'url:../../assets/discord/nitro.png'
import OfficialServers from '../components/officialServers'

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

        <section id="community-blob-servers">
          <h2>Community Blob Servers</h2>

          <p>
            To add your Blob Server to our Community Servers section, join the
            official
            <a href="https://1.blobs.gg" target="_blank">Blob Emoji server</a>
            and message our Blob Mail bot.
          </p>

          <p>
            In order to use custom emoji in other Discord Servers you need an
            active
            <img
              className="inline-icon"
              src={nitro}
              alt="Discord Nitro icon"
            />
            <a
              href="https://discordapp.com/nitro"
              target="_blank"
              className="strong"
              rel="noopener"
            >Discord Nitro</a
            >
            subscription.
          </p>
          {/*React will be mounted into this DOM node*/}
          <div className="community-guilds-wrapper"/>
        </section>
      </main>
    )
  }
}

export default Homepage
