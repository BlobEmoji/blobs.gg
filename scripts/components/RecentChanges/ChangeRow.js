import PropTypes from 'prop-types'
import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { titleCase } from '../../utils'
import MaterialEmoji from '../material/MaterialEmoji'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useMediaQuery } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'

const useStyles = makeStyles({
  span: {
    paddingLeft: '1rem',
  },
})

export default function ChangeRow({
  eventIcon,
  eventName,
  emoji,
  action,
  afterEmoji,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <TableRow>
      <TableCell>
        {eventIcon}
        <span className={classes.span}>{`${titleCase(eventName)}d`}</span>
      </TableCell>
      <TableCell>
        <MaterialEmoji baseSize={32} {...emoji} />
        {matches && <span className={classes.span}>{emoji.name}</span>}
      </TableCell>
      <TableCell>{action}</TableCell>
      <TableCell>
        {afterEmoji ? (
          <>
            <MaterialEmoji baseSize={32} {...afterEmoji} />
            {matches && <span className={classes.span}>{afterEmoji.name}</span>}
          </>
        ) : null}
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
