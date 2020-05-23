import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Emoji from './Emoji'
import GuildIcon from './GuildIcon'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { titleCase } from '../utils'

const HISTORY_ENDPOINT =
  window.location.host.endsWith('now.sh') ||
  'https://api.mousey.app/v3/emoji/blobs+community-blobs/changes'


function RenderChangeSet(props) {
  const { changeSet } = props

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
        const date = new Date(change.changed_at)
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
