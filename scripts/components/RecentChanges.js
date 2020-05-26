import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DateTimeFormatter, titleCase } from '../utils'
import { CreateAvatar, GuildAvatar, RemoveAvatar, RenameAvatar, UpdateAvatar } from './Avatars'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import MaterialEmoji from './MaterialEmoji'

const HISTORY_ENDPOINT = 'https://api.mousey.app/v3/emoji/blobs+community-blobs/changes'


function SkeletalLoading() {
  const randomArrayLength = [3, 4, 5, 6, 7]
  const randomListAmount = [...Array(randomArrayLength[Math.floor(Math.random() * randomArrayLength.length)]).keys()]

  const skeletalTable = randomListAmount.map((place) => {
    const simple = parseInt((Math.random() * 100).toString(10), 10) > 80

    return (
      <TableRow key={place}>
        <TableCell>
          <Skeleton variant="circle" width={40} height={40} />
        </TableCell>
        <TableCell>
          <Skeleton height={39} width={80} />
        </TableCell>
        <TableCell>
          <Skeleton variant="rect" width={32} height={32} />
        </TableCell>
        <TableCell>
          {simple ? <Skeleton height={39} width="100%" /> : null}
        </TableCell>
        <TableCell>
          {simple ? <Skeleton variant="circle" width={40} height={40} /> : null}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton height={22} width="80%" />}
          subheader={<Skeleton height={22} width="60%" />}
        />
        <TableContainer>
          <Table>
            <TableBody>
              {skeletalTable}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}


function RenderChangeSet(props) {
  const { changeSet } = props

  let guild = changeSet[0].guild
  guild.id = guild.id.toString()

  const titleDate = new Date(changeSet[0].changed_at)

  const blobs = changeSet.map((each) => {
    let emoji = each.emoji || each.before
    let action = each.after ? 'to' : ''
    let afterEmoji = each.after || null
    let eventIcon

    if (each.event === 'EMOJI_REMOVE') {
      eventIcon = <RemoveAvatar />
    } else if (each.event === 'EMOJI_CREATE') {
      eventIcon = <CreateAvatar />
    } else if (each.event === 'EMOJI_RENAME') {
      eventIcon = <RenameAvatar />
    } else if (each.event === 'EMOJI_UPDATE') {
      eventIcon = <UpdateAvatar />
    }

    return (
      <TableRow key={each.changed_at}>
        <TableCell>
          {eventIcon}
        </TableCell>
        <TableCell>
          {`${titleCase(each.event.split('_')[1])}d`}
        </TableCell>
        <TableCell>
          <MaterialEmoji baseSize={32} guild={guild} {...emoji} />
        </TableCell>
        <TableCell>
          {action}
        </TableCell>
        <TableCell>
          {afterEmoji ? <MaterialEmoji baseSize={32} guild={guild} {...afterEmoji} /> : null}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader
          avatar={<GuildAvatar name={guild.name} src={guild} />}
          title={guild.name}
          subheader={DateTimeFormatter.format(titleDate)}
        />
        <TableContainer>
          <Table>
            <TableBody>
              {blobs}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}

RenderChangeSet.propTypes = {
  changeSet: PropTypes.array.isRequired,
}

export default class RecentChangesWrapper extends Component {
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
    const randomArrayLength = [3, 4, 5]
    const randomListAmount = [...Array(randomArrayLength[Math.floor(Math.random() * randomArrayLength.length)]).keys()]

    if (Object.keys(changes).length === 0) {
      return (
        <>
          {Object.keys(randomListAmount).map((item) => {
            return (
              <SkeletalLoading key={`${item}-skeleton`} />
            )
          })}
        </>
      )
    }

    return (
      <>
        {Object.keys(changes).map((item) => {
          return (
            <RenderChangeSet changeSet={changes[item]} key={item} />
          )
        })}
      </>
    )
  }
}
