import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { shuffleArray } from '../../utils'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MaterialEmoji from './MaterialEmoji'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const RANDOM_SAMPLE_SIZE = 6
const useStyles = makeStyles((theme) => ({
  cell: {
    borderBottom: 0,
    padding: '0 15px 0 0',
  },
}))

function EmojiRow(props) {
  const classes = useStyles()

  return (
    props.emoji.map((emoji) => (
      <Box display="inline-block" className={classes.cell} key={emoji.id}>
        <MaterialEmoji baseSize={32} {...emoji} />
      </Box>
    ))
  )
}

EmojiRow.propTypes = {
  emoji: PropTypes.array.isRequired,
}

class Guild extends Component {
  constructor(props) {
    super(props)
    const { guild } = this.props

    this.state = {
      guild: guild,
      randomSample: shuffleArray(guild.emoji).slice(0, RANDOM_SAMPLE_SIZE),
      expanded: false,
    }
  }

  render() {
    return (
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <EmojiRow emoji={this.state.randomSample} />
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

Guild.propTypes = {
  guild: PropTypes.object.isRequired,
}

export default Guild
