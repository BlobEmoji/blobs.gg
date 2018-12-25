import React from 'react'
import PropTypes from 'prop-types'

export default function Emoji({ id, animated, name, ...rest }) {
  const extension = animated ? 'gif' : 'png'
  const url = `https://cdn.discordapp.com/emojis/${id}.${extension}`

  return <img className="emoji" src={url} alt={`:${name}:`} {...rest} />
}

Emoji.propTypes = {
  id: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}
