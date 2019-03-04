import React from 'react'
import PropTypes from 'prop-types'

export default function Emoji({id, animated, name, server, ...rest}) {
  const extension = animated ? 'gif' : 'png';
  const url = `https://cdn.discordapp.com/emojis/${id}.${extension}`;
  const alt = server ? `:${name}: from '${server}'` : `:${name}:`;

  return (
    <span className="emoji-container" data-tooltip={alt}>
      <img className="emoji" src={url} alt={alt} {...rest} />
    </span>
  )
}

Emoji.propTypes = {
  id: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
