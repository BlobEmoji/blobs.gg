import React from 'react'
import PropTypes from 'prop-types'

import Emoji from './Emoji'
import GuildIcon from './GuildIcon'


function RenderChangeSet(props) {
  const { changeSet } = props

  let guild = changeSet[0].guild
  guild.id = guild.id.toString()
  const blobs = changeSet.map((each) => {
    if (each.event === 'EMOJI_REMOVE') {
      return (
        <div className="event">
          Deleted:
          <Emoji baseSize={32} guild={guild} {...each.emoji} />
        </div>
      )
    } else if (each.event === 'EMOJI_CREATE') {
      return (
        <div className="event">
          created: <Emoji baseSize={32} guild={guild} {...each.emoji} />
        </div>
      )
    } else if (each.event === 'EMOJI_RENAME') {
      return (
        <div className="event">
          renamed: <Emoji baseSize={32} guild={guild} {...each.before} />
          to <Emoji baseSize={32} guild={guild} {...each.after} />
        </div>
      )
    } else if (each.event === 'EMOJI_UPDATE') {
      return (
        <div className="event">
          updated: <Emoji baseSize={32} guild={guild} {...each.before} />
          to <Emoji baseSize={32} guild={guild} {...each.after} />
        </div>
      )
    } else {
      return null
    }
  })

  return (<div className="guild">
    <GuildIcon guild={guild}/>&nbsp;
    {guild.name} at {changeSet[0].changed_at.toString()}
    {blobs}
  </div>)
}

RenderChangeSet.propTypes = {
  changeSet: PropTypes.array.isRequired,
}

export default function RecentChanges(props) {
  return (
    <div>
      {Object.keys(props.changes).map((item) => {
        return (
          <RenderChangeSet changeSet={props.changes[item]} key={item}/>
        )
      })}
    </div>
  )
}

RecentChanges.propTypes = {
  changes: PropTypes.object.isRequired, // TODO
}
