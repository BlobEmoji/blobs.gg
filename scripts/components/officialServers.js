import React from 'react'
import server1 from 'url:../../assets/server_icons/server1.svg'
import server2 from 'url:../../assets/server_icons/server2.svg'
import server3 from 'url:../../assets/server_icons/server3.svg'
import server4 from 'url:../../assets/server_icons/server4.svg'
import server5 from 'url:../../assets/server_icons/server5.svg'
import server6 from 'url:../../assets/server_icons/server6.svg'

function OfficialServers() {
  return (
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
  )
}

export default OfficialServers
