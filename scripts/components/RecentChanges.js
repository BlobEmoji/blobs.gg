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

  let guild = changeSet[0].guild
  guild.id = guild.id.toString()
  const titleDate = new Date(changeSet[0].changed_at);

  const blobs = changeSet.map((each) => {
    let emoji = each.emoji || each.before
    let action = each.after ? 'to' : ''
    let afterEmoji = each.after || null

    return (
      <Fragment key={each.changed_at}>
        <Grid item xs={3}>
          {`${titleCase(each.event.split('_')[1])}d`}
        </Grid>
        <Grid item xs={3}>
          <Emoji baseSize={32} guild={guild} {...emoji}/>
        </Grid>
        <Grid item xs={3}>
          {action}
        </Grid>
        <Grid item xs={3}>
          {afterEmoji ? <Emoji baseSize={32} guild={guild} {...afterEmoji}/> : null}
        </Grid>
      </Fragment>
    )
  })

  return (
    <div className="guild">
      <GuildIcon guild={guild}/>&nbsp;
      {guild.name} at {titleDate.toGMTString()}
      <Grid container spacing={3}>
        <Grid container item xs={6} spacing={3}>
          {blobs}
        </Grid>
      </Grid>
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
