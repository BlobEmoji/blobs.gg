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
        return (<div className="event" key={each.changed_at}>Deleted: <Emoji baseSize={32} guild={guild} {...each.emoji} /></div>)
      } else if (each.event === 'EMOJI_CREATE') {
        return (<div className="event" key={each.changed_at} > created: <Emoji baseSize={32} guild={guild} {...each.emoji} /> </div >)
      }
      else if (each.event === 'EMOJI_RENAME') {
        return (<div className="event" key={each.changed_at}>renamed: <Emoji baseSize={32} guild={guild} {...each.before} /> to <Emoji baseSize={32} guild={guild} {...each.after} /> </div>)
      }
      else if (each.event === 'EMOJI_UPDATE') {
        return (<div className="event" key={each.changed_at}>updated: <Emoji baseSize={32} guild={guild} {...each.before} /> to <Emoji baseSize={32} guild={guild} {...each.after} /></div>)
      }
    })

    return (<div className="guild" key={key}>
      <GuildIcon guild={guild} />&nbsp;
      {guild.name} at {new Date(changeSet[0].changed_at).toString()}
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