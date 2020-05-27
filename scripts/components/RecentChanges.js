import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DateTimeFormatter, titleCase } from '../utils'
import {
  CreateAvatar,
  GuildAvatar,
  RemoveAvatar,
  RenameAvatar,
  UpdateAvatar,
} from './Avatars'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import MaterialEmoji from './MaterialEmoji'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import makeStyles from '@material-ui/core/styles/makeStyles'

const HISTORY_ENDPOINT =
  window.location.host.endsWith('now.sh') ||
  process.env.NODE_ENV === 'development'
    ? 'https://api.mousey.app/v3/emoji/test/changes'
    : 'https://api.mousey.app/v3/emoji/blobs+community-blobs/changes'

const useStyles = makeStyles({
  panelDetails: {
    padding: 0,
  },
})

function SkeletalLoading() {
  const randomArrayLength = [3, 4, 5, 6, 7]
  const randomListAmount = [
    ...Array(
      randomArrayLength[Math.floor(Math.random() * randomArrayLength.length)]
    ).keys(),
  ]

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
            <TableBody>{skeletalTable}</TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}

function eventProcessing(each) {
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

  return { emoji, action, afterEmoji, eventIcon }
}

function TableGen(props) {
  const { eventIcon, eventName, guild, emoji, action, afterEmoji } = props

  return (
    <TableRow>
      <TableCell>{eventIcon}</TableCell>
      <TableCell>{`${titleCase(eventName)}d`}</TableCell>
      <TableCell>
        <MaterialEmoji baseSize={32} guild={guild} {...emoji} />
      </TableCell>
      <TableCell>{action}</TableCell>
      <TableCell>
        {afterEmoji ? (
          <MaterialEmoji baseSize={32} guild={guild} {...afterEmoji} />
        ) : null}
      </TableCell>
    </TableRow>
  )
}

TableGen.propTypes = {
  eventIcon: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  guild: PropTypes.object.isRequired,
  emoji: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  afterEmoji: PropTypes.object,
}

function RenderChangeSet(props) {
  let { changeSet } = props
  const titleDate = new Date(changeSet[0].changed_at)
  const classes = useStyles()
  let moreChangeSet
  let moreTest = false
  let moreBlobs = null
  let guild = changeSet[0].guild

  guild.id = guild.id.toString()

  if (changeSet.length > 5) {
    moreChangeSet = changeSet.slice(5)
    changeSet = changeSet.slice(0, 5)
    moreTest = true
  }

  const blobs = changeSet.map((each) => {
    const { emoji, action, afterEmoji, eventIcon } = eventProcessing(each)

    return (
      <TableGen
        key={each.changed_at}
        eventIcon={eventIcon}
        eventName={each.event.split('_')[1]}
        guild={guild}
        emoji={emoji}
        action={action}
        afterEmoji={afterEmoji}
      />
    )
  })

  if (moreTest) {
    moreBlobs = moreChangeSet.map((each) => {
      const { emoji, action, afterEmoji, eventIcon } = eventProcessing(each)

      return (
        <TableGen
          key={each.changed_at}
          eventIcon={eventIcon}
          eventName={each.event.split('_')[1]}
          guild={guild}
          emoji={emoji}
          action={action}
          afterEmoji={afterEmoji}
        />
      )
    })
  }

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
            <TableBody>{blobs}</TableBody>
          </Table>
        </TableContainer>
        {moreTest && (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Panel Controls"
            >
              {`See ${moreChangeSet.length} more changes`}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
              <TableContainer>
                <Table>
                  <TableBody>{moreBlobs}</TableBody>
                </Table>
              </TableContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
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
      if (
        [
          'EMOJI_CREATE',
          'EMOJI_RENAME',
          'EMOJI_UPDATE',
          'EMOJI_REMOVE',
        ].includes(change.event)
      ) {
        const date = new Date(change.changed_at)
        const key = [
          change.guild.id,
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
        ]
        changes[key] = changes[key] ?? []
        changes[key].push(change)
      }
    }

    return changes
  }

  async fetchMoreChanges() {
    this.setState({ fetching: true })
    const response = await fetch(
      `${HISTORY_ENDPOINT}?before=${this.state.earliest}`
    )
    const json = await response.json()

    if (json.length === 0) {
      // catch end of data stream, this leaves fetching true, preventing any more requests
      return
    }

    let transformed = this.historyTransform(json)
    let merged = this.state.changes
    for (const key in transformed) {
      if (transformed.hasOwnProperty(key)) {
        const changeSet = transformed[key]
        if (merged.hasOwnProperty(key)) {
          merged[key].push(...changeSet)
        } else {
          merged[key] = changeSet
        }
      }
    }

    this.setState({
      changes: merged,
      earliest: json[json.length - 1].changed_at,
      fetching: false,
    })
  }

  listener = async () => {
    // The total scroll height of the page, minus the height of the screen.
    const ending = document.body.scrollHeight - window.innerHeight

    // `window.scrollY` refers to the distance from the top of the page of
    // the upper border of the viewport.
    if (
      ending - window.scrollY <= window.innerHeight / 2 &&
      !this.state.fetching
    ) {
      await this.fetchMoreChanges()
    }
  }
  componentDidMount = async () => {
    const response = await fetch(HISTORY_ENDPOINT)
    const json = await response.json()
    this.setState({
      changes: this.historyTransform(json),
      earliest: json[json.length - 1].changed_at,
    })
    window.addEventListener('scroll', this.listener)
    while (
      document.body.scrollHeight < window.innerHeight &&
      !this.state.fetching
    ) {
      // eslint-disable-next-line no-await-in-loop
      await this.fetchMoreChanges()
    }
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.listener)
  }

  render() {
    const { changes } = this.state
    const randomArrayLength = [3, 4, 5]
    const randomListAmount = [
      ...Array(
        randomArrayLength[Math.floor(Math.random() * randomArrayLength.length)]
      ).keys(),
    ]

    if (Object.keys(changes).length === 0) {
      return (
        <>
          {Object.keys(randomListAmount).map((item) => {
            return <SkeletalLoading key={`${item}-skeleton`} />
          })}
        </>
      )
    }

    return (
      <>
        {Object.keys(changes).map((item) => {
          return <RenderChangeSet changeSet={changes[item]} key={item} />
        })}
      </>
    )
  }
}
