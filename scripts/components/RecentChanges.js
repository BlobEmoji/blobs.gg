import React from 'react'
import PropTypes from 'prop-types'

import Emoji from './Emoji'
import GuildIcon from './GuildIcon'


export default class RecentChanges extends React.Component {
  get changes() {
    return this.props.changes.changes
  }


  renderChangeSet(changeSet, key) {
    let guild = changeSet[0].guild
    guild.id = guild.id.toString()
    const blobs = changeSet.map((each) => {
      if (each.event === 'EMOJI_REMOVE') {
        return (<span key={each.changed_at}>Deleted: <Emoji baseSize={32} guild={guild} {...each.emoji} /></span>)
      } else if (each.event === 'EMOJI_CREATE') {
        return (<span key={each.changed_at}>created: <Emoji baseSize={32} guild={guild} {...each.emoji} /> </span>)
      }
      else if (each.event === 'EMOJI_RENAME') {
        return (<span key={each.changed_at}>renamed: <Emoji baseSize={32} guild={guild} {...each.before} /> to  <Emoji baseSize={32} guild={guild} {...each.after} /> </span>)
      }
      else if (each.event === 'EMOJI_UPDATE') {
        return (<span key={each.changed_at}>updated: <Emoji baseSize={32} guild={guild} {...each.before} /> to  <Emoji baseSize={32} guild={guild} {...each.after} /></span>)
      }
    })

    return (<div key={key}>
      <GuildIcon guild={guild} />
      {guild.name}
      {blobs}
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