import PropTypes from 'prop-types'
import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import { titleCase } from '../../utils'
import MaterialEmoji from '../material/MaterialEmoji'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useMediaQuery } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  //TODO - Make these unnecessary
  create: {
    paddingRight: '0.5975rem',
  },
  rename: {
    paddingRight: '0.367rem',
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
  //TODO - Restore the "useMediaQuery" and fix long names
  const matches = true

  return (
    <Box display="flex" alignItems="center">
      <Box padding="0.5rem">
        {eventIcon}
      </Box>
      <Box padding="0.25rem">
        {
          (eventName === 'CREATE') ? (
            <span className={classes.create}>{`${titleCase(eventName)}d`}</span>
          ) : (eventName === 'UPDATE') ? (
            <span className={classes.rename}>{`${titleCase(eventName)}d`}</span>
          ) : <span>{`${titleCase(eventName)}d`}</span>
        }
      </Box>
      <Box>
        <Box padding="0.5rem">
          <MaterialEmoji baseSize={32} {...emoji} />
        </Box>
      </Box>
      {matches &&
          <Box padding="0.25rem">
            {emoji.name}
          </Box>
      }
      <Box padding="0.25rem">{action}</Box>
      {afterEmoji ? (
        <Box padding="0.5rem">
          <MaterialEmoji baseSize={32} {...afterEmoji} />
        </Box>
      ) : null}
      {(matches && afterEmoji) &&
          <Box padding="0.25rem">
            {afterEmoji.name}
          </Box>
      }
    </Box>
    /*
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
    */
  )
}

ChangeRow.propTypes = {
  eventIcon: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  emoji: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  afterEmoji: PropTypes.object,
}
