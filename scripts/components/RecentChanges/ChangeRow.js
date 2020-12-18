import PropTypes from 'prop-types'
import React from 'react'

import { getDateTimeFormatter, titleCase } from '../../utils'
import MaterialEmoji from '../material/MaterialEmoji'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
  changelogBox: {
    margin: '0.5rem',
  },
  text: {
    padding: '0.25rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  to: {
    padding: '0.25rem',
  },
})

function ChangeRow({
  eventIcon,
  eventName,
  emoji,
  action,
  afterEmoji,
  changedAt,
  isTime12
}) {
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" minWidth="7.1rem">
        <Box margin="0.5rem">
          <Tooltip title={getDateTimeFormatter(isTime12).format(new Date(changedAt))} arrow>
            <div>{eventIcon}</div>
          </Tooltip>
        </Box>
        <span>{`${titleCase(eventName)}d`}</span>
      </Box>
      <MaterialEmoji baseSize={32} boxClassName={clsx(classes.changelogBox)} {...emoji} />
      {!afterEmoji &&
        <Box className={classes.text}>{emoji.name}</Box>
      }
      <Box className={classes.to}>{action}</Box>
      {afterEmoji && (
        <MaterialEmoji baseSize={32} boxClassName={clsx(classes.changelogBox)} {...afterEmoji} />
      )}
      {afterEmoji &&
        <Box className={classes.text}>
          {afterEmoji.name}
        </Box>
      }
    </Box>
  )
}

ChangeRow.propTypes = {
  eventIcon: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  emoji: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  afterEmoji: PropTypes.object,
  changedAt: PropTypes.string.isRequired,
  isTime12: PropTypes.bool.isRequired
}

export default ChangeRow
