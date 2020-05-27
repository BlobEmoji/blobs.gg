import TableGen from './TableGen'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import {
  CreateAvatar,
  GuildAvatar,
  RemoveAvatar,
  RenameAvatar,
  UpdateAvatar,
} from '../Avatars'
import { DateTimeFormatter } from '../../utils'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import PropTypes from 'prop-types'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

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

const useStyles = makeStyles({
  panelDetails: {
    padding: 0,
  },
})

export default function RenderChangeSet(props) {
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
