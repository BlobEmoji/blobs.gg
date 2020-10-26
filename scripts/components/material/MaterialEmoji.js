import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'


function emojiUrl(id, extension, size) {
  const sizeParam = size == null ? '' : `?size=${size}`
  return `https://cdn.discordapp.com/emojis/${id}.${extension}${sizeParam}`
}

function MaterialEmoji(props) {
  const {
    id,
    animated,
    name,
    guild,
    baseSize,
    showGuild,
  } = props
  const extension = animated ? 'gif' : 'png'
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
        srcSet={srcSet}
        src={emojiUrl(id, extension, baseSize)}
        variant="square"
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
  className: PropTypes.string,
  invite: PropTypes.bool,
}

MaterialEmoji.defaultProps = {
  invite: false,
  baseSize: 64,
  showGuild: false,
}

export default MaterialEmoji
