import PropTypes from 'prop-types'
import React from 'react'

import { titleCase } from '../../utils'
import MaterialEmoji from '../material/MaterialEmoji'
import Box from '@material-ui/core/Box'

export default function ChangeRow({
  eventIcon,
  eventName,
  emoji,
  action,
  afterEmoji,
}) {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" minWidth="7.1rem">
        <Box padding="0.5rem">
          {eventIcon}
        </Box>
        <span>{`${titleCase(eventName)}d`}</span>
      </Box>
      <Box>
        <Box padding="0.5rem">
          <MaterialEmoji baseSize={32} {...emoji} />
        </Box>
      </Box>
      {!afterEmoji &&
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
      {afterEmoji &&
          <Box padding="0.25rem" maxWidth="15rem" overflow="hidden" textOverflow="ellipsis">
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
}
