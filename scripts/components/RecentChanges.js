import React from 'react'
import PropTypes from 'prop-types'

import Emoji from './Emoji'
import GuildIcon from './GuildIcon'


export default class RecentChanges extends React.Component {
  get changes() {
    return this.props.changes
  }


  renderChangeSet(changeSet, key) {
    let guild = changeSet[0].guild
    guild.id = guild.id.toString()
    const blobs = changeSet.map((each) => {
      if (each.event === 'EMOJI_REMOVE') {
        return (
          <tr className="event" key={each.changed_at}>
            <td>
              <img className="event-type-icon" src="https://cdn.discordapp.com/emojis/567088349484023818.png?v=1" />
            </td>
            <td>
              Deleted:
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.emoji} />
            </td>
          </tr>
        )
      } else if (each.event === 'EMOJI_CREATE') {
        return (
          <tr className="event" key={each.changed_at}>
            <td>
              <img className="event-type-icon" src="https://cdn.discordapp.com/emojis/567088336166977536.png?v=1" />
            </td>
            <td>
              created:
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.emoji} />
            </td>
          </tr>
        )
      }
      else if (each.event === 'EMOJI_RENAME') {
        return (
          <tr className="event" key={each.changed_at}>
            <td>
              <img className="event-type-icon" src="https://discordapp.com/assets/e1ec53c5d89c0291001989a36716aa9a.svg" />
            </td>
            <td>
              renamed:
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.after} />
            </td>
            <td>
              from
            </td>
            <td>
              <span>
                <pre>
                  :{each.before.name}:
                </pre>
              </span>
            </td>
          </tr>
        )
      }
      else if (each.event === 'EMOJI_UPDATE') {
        return (
          <tr className="event" key={each.changed_at}>
            <td>
              <img className="event-type-icon" src="https://discordapp.com/assets/e1ec53c5d89c0291001989a36716aa9a.svg" />
            </td>
            <td>
              updated:
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.after} />
            </td>
            <td>
              from
            </td>
            <td><Emoji baseSize={32} guild={guild} {...each.before} />
            </td>
          </tr >
        )
      }
    })

    return (<div className="guild" key={key}>
      <h3>
        <GuildIcon guild={guild} />
        <span className="name" title={guild.name}>
          {guild.name} at {changeSet[0].changed_at.toString()}
        </span>
      </h3>
      <table>
        <tbody>
          {blobs}
        </tbody>
      </table>
    </div>)
  }
  render() {
    let changeSets = []
    for (const key in this.changes) {
      if (this.changes.hasOwnProperty(key)) {
        const changeSet = this.changes[key];
        changeSets.push(this.renderChangeSet(changeSet, key))
      }
    }



    return (<div>
      {changeSets}
    </div>)
  }
}

RecentChanges.propTypes = {
  changes: PropTypes.object.isRequired // TODO 
}