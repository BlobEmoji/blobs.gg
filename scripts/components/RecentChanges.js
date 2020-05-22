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
              renamed:
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.before} />
            </td>
            <td>
              to
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.after} />
            </td>
          </tr>
        )
      }
      else if (each.event === 'EMOJI_UPDATE') {
        return (
          <tr className="event" key={each.changed_at}>
            <td>
              updated:
            </td>
            <td>
              <Emoji baseSize={32} guild={guild} {...each.before} />
            </td>
            <td>
              to
            </td>
            <td><Emoji baseSize={32} guild={guild} {...each.after} />
            </td>
          </tr>
        )
      }
    })

    return (<div className="guild" key={key}>
      <GuildIcon guild={guild} />&nbsp;
      {guild.name} at {changeSet[0].changed_at.toString()}
      <table>
        {blobs}
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