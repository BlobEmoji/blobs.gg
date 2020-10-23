import React, { Component } from 'react'
import server1 from 'url:../../assets/server_icons/server1.svg'
import server2 from 'url:../../assets/server_icons/server2.svg'
import server3 from 'url:../../assets/server_icons/server3.svg'
import server4 from 'url:../../assets/server_icons/server4.svg'
import server5 from 'url:../../assets/server_icons/server5.svg'
import server6 from 'url:../../assets/server_icons/server6.svg'
import nitro from 'url:../../assets/discord/nitro.png'

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

        <section id="official-blob-servers">
          <h2>The Official Blob Emoji Servers</h2>
          {/*React will be mounted into this DOM node*/}
          <div className="guilds">
            <div className="guild">
              <h3>
                <img className="icon" src={server1} alt="Server 1 Icon"/>
                Blob Emoji
              </h3>

              <a
                href="https://1.blobs.gg"
                target="_blank"
                className="join-guild button"
              >Join Server</a
              >
            </div>
            <div className="guild">
              <h3>
                <img className="icon" src={server2} alt="Server 2 Icon"/>
                Blob Emoji 2: Google Blobs
              </h3>

              <a
                href="https://2.blobs.gg"
                target="_blank"
                className="join-guild button"
              >Join Server</a
              >
            </div>
            <div className="guild">
              <h3>
                <img className="icon" src={server3} alt="Server 3 Icon"/>
                Blob Emoji 3: Emotions
              </h3>

              <a
                href="https://3.blobs.gg"
                target="_blank"
                className="join-guild button"
              >Join Server</a
              >
            </div>
            <div className="guild">
              <h3>
                <img className="icon" src={server4} alt="Server 4 Icon"/>
                Blob Emoji 4: Actions
              </h3>

              <a
                href="https://4.blobs.gg"
                target="_blank"
                className="join-guild button"
              >Join Server</a
              >
            </div>
            <div className="guild">
              <h3>
                <img className="icon" src={server5} alt="Server 5 Icon"/>
                Blob Emoji 5: Characters
              </h3>

              <a
                href="https://5.blobs.gg"
                target="_blank"
                className="join-guild button"
              >Join Server</a
              >
            </div>
            <div className="guild">
              <h3>
                <img className="icon" src={server6} alt="Server 6 Icon"/>
                Blob Emoji 6: Google / Animals
              </h3>

              <a
                href="https://6.blobs.gg"
                target="_blank"
                className="join-guild button"
              >Join Server</a
              >
            </div>
          </div>
        </section>

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
