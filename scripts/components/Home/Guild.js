import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GuildAvatar } from '../Avatars'
import { shuffleArray } from '../../utils'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import CardContent from '@material-ui/core/CardContent'
import Emoji from '../Emoji'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

const RANDOM_SAMPLE_SIZE = 7
const useStyles = makeStyles((theme) => ({
  cell: {
    borderBottom: 0,
    margin: '0.3rem',
  },
  joinServer: {
    textTransform: 'none',
    color: 'white',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

function EmojiRow(props) {
  const classes = useStyles()

  return (
    props.emoji.map((emoji) => (
      <Emoji
        baseSize={32} key={emoji.id} {...emoji} boxClassName={clsx(classes.cell)} />
    ))
  )
}

EmojiRow.propTypes = {
  emoji: PropTypes.array.isRequired,
}

function JoinServer(props) {
  const classes = useStyles()

  return (
    <Button
      size="small" color="primary" variant="contained" className={classes.joinServer} component={Link}
      href={props.invite} target="_blank">
      Join Server
    </Button>
  )
}

JoinServer.propTypes = {
  invite: PropTypes.string.isRequired,
}

function ShowMore(props) {
  const classes = useStyles()
  const { expanded, emojiCount } = props

  if (emojiCount <= RANDOM_SAMPLE_SIZE) {
    return null
  }

  return (
    <IconButton onClick={props.handleClick} className={clsx(classes.expand, { [classes.expandOpen]: expanded })}>
      <KeyboardArrowDownIcon />
    </IconButton>
  )
}

ShowMore.propTypes = {
  expanded: PropTypes.bool.isRequired,
  emojiCount: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
}

class Guild extends Component {
  constructor(props) {
    super(props)
    const { guild } = this.props

    this.state = {
      randomSample: shuffleArray(guild.emoji).slice(0, RANDOM_SAMPLE_SIZE),
      expanded: false,
    }
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  componentDidMount() {
    if (this.props.communityRender) {
      this.props.communityRender()
    }
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.communityRender === this.props.communityRender

  }

  render() {
    const { expanded } = this.state
    const { guild } = this.props

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            avatar={<GuildAvatar name={guild.name} src={guild} />}
            title={guild.name}
            action={<ShowMore handleClick={this.handleClick} expanded={this.state.expanded} emojiCount={guild.emoji.length}/>}
          />
          <CardContent>
            <Box
              display="grid" gridTemplateColumns="repeat(7, 1fr)"
              margin="-0.3rem 0" padding="0 0.1rem">
              <EmojiRow emoji={expanded ? guild.emoji : this.state.randomSample} />
            </Box>
          </CardContent>
          <CardActions>
            <JoinServer invite={guild.invite} />
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

Guild.propTypes = {
  guild: PropTypes.object.isRequired,
  communityRender: PropTypes.func,
}

export default Guild
