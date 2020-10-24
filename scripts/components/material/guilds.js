import React from 'react'
import PropTypes from 'prop-types'
import Guild from './guild'
import Grid from '@material-ui/core/Grid'
import { useScrollNearEnd } from '../../hooks'

export function Guilds(props) {
  const { guilds, perPage, slice, className } = props
  const [upTo, setUpTo] = React.useState(perPage)
  let newGuilds = guilds;
  if (slice) {
    newGuilds = guilds.slice(0, upTo)
  }

  useScrollNearEnd(() => {
    if (!slice) {
      return
    }
    if (upTo < guilds.length) {
      setUpTo((prev) => Math.min(prev + perPage, guilds.length))
    }
  })

  return (
    <Grid container spacing={1} className={className}>
      {newGuilds.map((guild) => (
        <Guild key={guild.id} guild={guild} />
      ))}
    </Grid>
  )
}

Guilds.defaultProps = {
  slice: false,
  perPage: 9,
}

Guilds.propTypes = {
  guilds: PropTypes.array.isRequired,
  slice: PropTypes.bool,
  perPage: PropTypes.number,
  className: PropTypes.string
}
