import React from 'react'
import nitro from 'url:../../assets/discord/nitro.png'

function CommunityServers() {
  return (
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
  )
}

export default CommunityServers
