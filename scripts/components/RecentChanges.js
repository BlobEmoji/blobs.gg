import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Emoji from './Emoji'
import GuildIcon from './GuildIcon'
import CircularProgress from '@material-ui/core/CircularProgress'

const HISTORY_ENDPOINT =
  window.location.host.endsWith('now.sh') ||
  'https://api.mousey.app/v3/emoji/blobs+community-blobs/changes'


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
          Created: <Emoji baseSize={32} guild={guild} {...each.emoji} />
        </div>
      )
    } else if (each.event === 'EMOJI_RENAME') {
      return (
        <div className="event">
          Renamed: <Emoji baseSize={32} guild={guild} {...each.before} />
          to <Emoji baseSize={32} guild={guild} {...each.after} />
        </div>
      )
    } else if (each.event === 'EMOJI_UPDATE') {
      return (
        <div className="event">
          Updated: <Emoji baseSize={32} guild={guild} {...each.before} />
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

export default class RecentChanges extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changes: {},
    }
  }

  historyTransform = (historyData) => {
    let changes = {}
    for (const change of historyData) {
      if (['EMOJI_CREATE', 'EMOJI_RENAME', 'EMOJI_UPDATE', 'EMOJI_REMOVE'].includes(change.event)) {
        const date = change.changed_at = new Date(change.changed_at)
        const key = [change.guild.id, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()]
        changes[key] = (changes[key] ?? [])
        changes[key].push(change)
      }
    }
    this.setState({ changes: changes })
  }

  componentDidMount = async () => {
    const response = await fetch(HISTORY_ENDPOINT)
    const json = await response.json()
    this.historyTransform(json)
  }

  render() {
    const { changes } = this.state

    if (changes.length === 0) {
      return (
        <CircularProgress/>
      )
    }

    return (
      <div>
        {Object.keys(this.state.changes).map((item) => {
          return (
            <RenderChangeSet changeSet={this.state.changes[item]} key={item}/>
          )
        })}
      </div>
    )
  }
}
