import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { titleCase } from '../../utils'
import MaterialEmoji from '../MaterialEmoji'

export default function ChangeRow({
  eventIcon,
  eventName,
  emoji,
  action,
  afterEmoji,
}) {
  return (
    <TableRow>
      <TableCell>{eventIcon}</TableCell>
      <TableCell>{`${titleCase(eventName)}d`}</TableCell>
      <TableCell>
        <MaterialEmoji baseSize={32} {...emoji} />
      </TableCell>
      <TableCell>{action}</TableCell>
      <TableCell>
        {afterEmoji ? <MaterialEmoji baseSize={32} {...afterEmoji} /> : null}
      </TableCell>
    </TableRow>
  )
}

ChangeRow.propTypes = {
  eventIcon: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  emoji: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  afterEmoji: PropTypes.object,
}
