import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { titleCase } from '../../utils'
import MaterialEmoji from '../MaterialEmoji'
import PropTypes from 'prop-types'
import React from 'react'

export default function TableGen(props) {
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
