import React from 'react'
import PropTypes from 'prop-types'

function guildIconUrl({ id, icon }, size) {
  const sizeParam = size == null ? '' : `?size=${size}`
  return `https://cdn.discordapp.com/icons/${id}/${icon}.png${sizeParam}`
}

export default function GuildIcon({ guild, baseSize = 32 }) {
  const srcSet = `
    ${guildIconUrl(guild, baseSize)},
    ${guildIconUrl(guild, baseSize * 2)} 2x
  `

  return (
    <img
      className="icon"
      srcSet={srcSet}
      src={guildIconUrl(guild, baseSize)}
      alt={`${guild.name}'s' icon`}
    />
  )
}

GuildIcon.propTypes = {
  guild: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  baseSize: PropTypes.number,
}
