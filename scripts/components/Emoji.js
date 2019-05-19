import React from 'react'
import PropTypes from 'prop-types'

function emojiUrl(id, extension, size) {
  const sizeParam = size == null ? '' : `?size=${size}`
  return `https://cdn.discordapp.com/emojis/${id}.${extension}${sizeParam}`
}

export default function Emoji({
  id,
  animated,
  name,
  server,
  baseSize = 64,
  ...rest
}) {
  const extension = animated ? 'gif' : 'png'
  const alt = server ? `:${name}: (${server})` : `:${name}:`

  const srcSet = `
    ${emojiUrl(id, extension, baseSize)},
    ${emojiUrl(id, extension, baseSize * 2)} 2x
  `

  return (
    <span className="emoji-container" data-tooltip={alt}>
      <img
        className="emoji"
        srcSet={srcSet}
        src={emojiUrl(id, extension, baseSize)}
        alt={alt}
        {...rest}
      />
    </span>
  )
}

Emoji.propTypes = {
  id: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}
