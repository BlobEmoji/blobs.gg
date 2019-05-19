import React from 'react'

function serverIconUrl({ id, icon }, size) {
  const sizeParam = size == null ? '' : `?size=${size}`
  return `https://cdn.discordapp.com/icons/${id}/${icon}.png${sizeParam}`
}

export default function ServerIcon({ server, baseSize = 32 }) {
  const srcSet = `
    ${serverIconUrl(server, baseSize)},
    ${serverIconUrl(server, baseSize * 2)} 2x
  `

  return (
    <img
      className="icon"
      srcSet={srcSet}
      src={serverIconUrl(server, baseSize)}
      alt={`${server.name}'s' icon`}
    />
  )
}
