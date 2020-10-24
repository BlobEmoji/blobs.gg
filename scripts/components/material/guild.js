import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GuildAvatar } from '../Avatars'
import { shuffleArray } from '../../utils'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CardContent from '@material-ui/core/CardContent'
import MaterialEmoji from './MaterialEmoji'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'

const RANDOM_SAMPLE_SIZE = 6
const useStyles = makeStyles((theme) => ({
  cell: {
    borderBottom: 0,
    padding: 0,
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


function ManyEmojiRows(props) {
  return (
    props.emoji.map((emoji) => (
      <MaterialEmoji baseSize={32} key={emoji.id} {...emoji} />
    ))
  )
}

ManyEmojiRows.propTypes = {
  emoji: PropTypes.array.isRequired,
}


function EmojiRow(props) {
  const classes = useStyles()

  return (
    <Table>
      <TableBody>
        <TableRow>
          {props.randomSample.map((emoji) => (
            <TableCell className={classes.cell} key={emoji.id}>
              <MaterialEmoji baseSize={32} {...emoji} />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

EmojiRow.propTypes = {
  randomSample: PropTypes.array.isRequired,
}

function JoinServer() {
  const classes = useStyles()

  return (
    <Button size="small" color="primary" variant="contained" className={classes.joinServer}>
      Join Server
    </Button>
  )
}

function ShowMore(props) {
  const classes = useStyles()
  const { expanded } = props

  return (
    <IconButton onClick={props.handleClick} className={clsx(classes.expand, { [classes.expandOpen]: expanded })}>
      {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  )
}

ShowMore.propTypes = {
  expanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
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

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { guild, expanded } = this.state

    return (
      <Grid item xs={4}>
        <Card>
          <CardHeader
            avatar={<GuildAvatar name={guild.name} src={guild} />}
            title={guild.name}
            action={<ShowMore handleClick={this.handleClick} expanded={this.state.expanded} />}
          />
          <CardContent>
            {expanded ? <ManyEmojiRows emoji={guild.emoji} /> : <EmojiRow randomSample={this.state.randomSample} />}
          </CardContent>
          <CardActions>
            <JoinServer />
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

Guild.propTypes = {
  guild: PropTypes.object.isRequired,
}

export default Guild
