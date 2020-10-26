import React from 'react'
import PropTypes from 'prop-types'
import Guild from './guild'
import Grid from '@material-ui/core/Grid'

export function Guilds(props) {
  const { guilds, className } = props

  if (guilds.length === 0) {
    return null
  }

  return (
    <Grid container spacing={1} className={className}>
      {guilds.map((guild) => (
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
  className: PropTypes.string,
  skeletonCount: PropTypes.number.isRequired,
}
