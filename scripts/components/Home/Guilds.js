import React from 'react'
import PropTypes from 'prop-types'
import Guild from './Guild'
import Grid from '@material-ui/core/Grid'
import { useScrollNearEnd } from '../../hooks'
import SkeletonGuild from './SkeletonGuild'

function Guilds(props) {
  const { guilds, perPage, slice, className } = props
  const [upTo, setUpTo] = React.useState(perPage)

  let newGuilds = guilds
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

  if (guilds.length === 0) {
    return (
      <Grid container spacing={3} className={className}>
        {Array.from({ length: props.skeletonCount }, (_, index) => (
          <SkeletonGuild key={index} />
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={3} className={className}>
      {newGuilds.map((guild) => (
        <Guild
          key={guild.id}
          guild={guild}
          communityRender={props.communityRender}
        />
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
  communityRender: PropTypes.func,
}

export default Guilds
