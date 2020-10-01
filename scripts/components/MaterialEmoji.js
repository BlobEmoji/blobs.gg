import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  emoji: {
    objectFit: 'contain',
    width: 32,
    height: 32,
    verticalAlign: 'middle',
    display: 'inline-block',
  },
})

function emojiUrl(id, extension, size) {
  const sizeParam = size == null ? '' : `?size=${size}`
  return `https://cdn.discordapp.com/emojis/${id}.${extension}${sizeParam}`
}

export default function MaterialEmoji({
  id,
  animated,
  name,
  guild,
  baseSize = 64,
  showGuild = false,
}) {
  const extension = animated ? 'gif' : 'png'
  const classes = useStyles()
  let alt = `:${name}:`

  if (guild != null && showGuild) {
    alt += ` (${guild.name})`
  }

  const srcSet = `
    ${emojiUrl(id, extension, baseSize)},
    ${emojiUrl(id, extension, baseSize * 2)} 2x
  `

  return (
    <Tooltip title={alt} arrow>
      <Avatar
        alt={name}
        classes={{
          img: classes.emoji,
        }}
        srcSet={srcSet}
        src={emojiUrl(id, extension, baseSize)}
        variant="square"
        className={classes.emoji}
      />
    </Tooltip>
  )
}

MaterialEmoji.propTypes = {
  id: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  guild: PropTypes.object,
  baseSize: PropTypes.number,
  showGuild: PropTypes.bool,
}
