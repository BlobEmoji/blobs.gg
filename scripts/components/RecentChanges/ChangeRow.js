import PropTypes from 'prop-types'
import React from 'react'
import { getDateTimeFormatter, titleCase } from '../../utils'
import Emoji from '../Emoji'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles({
  iconContainer: {
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
  rowDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  actionDiv: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '7.1rem',
  }
})

function ChangeRow(
  {
    eventIcon,
    eventName,
    emoji,
    action,
    afterEmoji,
    changedAt,
  }) {
  const classes = useStyles()

  return (
    <div className={classes.rowDiv}>
      <div className={classes.actionDiv}>
        <div className={classes.iconContainer}>
          <Tooltip title={getDateTimeFormatter().format(new Date(changedAt))} arrow>
            <div>{eventIcon}</div>
          </Tooltip>
        </div>
        <span>{`${titleCase(eventName)}d`}</span>
      </div>
      <Emoji baseSize={32} containerClassName={classes.iconContainer} {...emoji} />
      {!afterEmoji && <div className={classes.text}>{emoji.name}</div>}
      <div className={classes.to}>{action}</div>
      {afterEmoji &&
      <>
        <Emoji baseSize={32} containerClassName={classes.iconContainer} {...afterEmoji} />
        <div className={classes.text}>
          {afterEmoji.name}
        </div>
      </>}
    </div>
  )
}

ChangeRow.propTypes = {
  eventIcon: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  emoji: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  afterEmoji: PropTypes.object,
  changedAt: PropTypes.string.isRequired,
}

export default ChangeRow
