import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { CreateAvatar, GuildAvatar, RemoveAvatar, RenameAvatar, UpdateAvatar } from '../Avatars'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { DateTimeFormatter } from '../../utils'
import ChangeRow from './ChangeRow'
import Grid from '@material-ui/core/Grid'

const emojiAction = {
  EMOJI_REMOVE: <RemoveAvatar />,
  EMOJI_CREATE: <CreateAvatar />,
  EMOJI_RENAME: <RenameAvatar />,
  EMOJI_UPDATE: <UpdateAvatar />,
}

const useStyles = makeStyles({
  card: {
    marginBottom: '2rem',
  },
  panelDetails: {
    padding: 0,
  },
})

const DEFAULT_MAXIMUM = 10

export default function ChangeSet(props) {
  let { changeSet } = props

  const date = new Date(changeSet[0].changed_at)
  const classes = useStyles()

  let guild = changeSet[0].guild
  guild.id = guild.id.toString()

  let hasMore = false
  let collapsedChangeSet = []
  let collapsedRows = null

  function rows(change, index) {
    const EventIcon = emojiAction[change.event]

    const emoji = change.emoji || change.before
    const action = change.after ? 'to' : ''
    const afterEmoji = change.after || null

    return (
      <ChangeRow
        key={`${change.changed_at}-${index}`}
        eventIcon={EventIcon}
        eventName={change.event.split('_')[1]}
        emoji={emoji}
        action={action}
        afterEmoji={afterEmoji}
      />
    )
  }

  if (changeSet.length > DEFAULT_MAXIMUM) {
    hasMore = true
    collapsedChangeSet = changeSet.slice(DEFAULT_MAXIMUM)
    collapsedRows = collapsedChangeSet.map(rows)
    changeSet = changeSet.slice(0, DEFAULT_MAXIMUM)
  }

  const blobs = changeSet.map(rows)

  return (
    <Grid item xs={6}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<GuildAvatar name={guild.name} src={guild} />}
          title={guild.name}
          subheader={DateTimeFormatter.format(date)}
        />
        <TableContainer>
          <Table>
            <TableBody>{blobs}</TableBody>
          </Table>
        </TableContainer>
        {hasMore && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Panel Controls"
            >
              {`See ${collapsedChangeSet.length} more changes`}
            </AccordionSummary>
            <AccordionDetails className={classes.panelDetails}>
              <TableContainer>
                <Table>
                  <TableBody>{collapsedRows}</TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        )}
      </Card>
    </Grid>
  )
}

ChangeSet.propTypes = {
  changeSet: PropTypes.array.isRequired,
}
