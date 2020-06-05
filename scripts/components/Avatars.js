import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import red from '@material-ui/core/colors/red'
import AddIcon from '@material-ui/icons/Add'
import green from '@material-ui/core/colors/green'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import lightBlue from '@material-ui/core/colors/lightBlue'
import BrushIcon from '@material-ui/icons/Brush'
import indigo from '@material-ui/core/colors/indigo'
import makeStyles from '@material-ui/core/styles/makeStyles'

export function GuildAvatar(props) {
  const { name, src } = props
  const { id, icon } = src

  return (
    <Avatar
      alt={name}
      src={`https://cdn.discordapp.com/icons/${id}/${icon}.png?size=64`}
    >
      {name}
    </Avatar>
  )
}

GuildAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.object.isRequired,
}

const useStyles = makeStyles({
  delete: {
    color: red[500],
    verticalAlign: 'middle',
  },
  create: {
    color: green[500],
    verticalAlign: 'middle',
  },
  rename: {
    color: lightBlue[500],
    verticalAlign: 'middle',
  },
  update: {
    color: indigo[400],
    verticalAlign: 'middle',
  },
})

export function RemoveAvatar() {
  const classes = useStyles()

  return <DeleteIcon fontSize="large" className={classes.delete} />
}

export function CreateAvatar() {
  const classes = useStyles()

  return <AddIcon fontSize="large" className={classes.create} />
}

export function RenameAvatar() {
  const classes = useStyles()

  return <EditOutlinedIcon fontSize="large" className={classes.rename} />
}

export function UpdateAvatar() {
  const classes = useStyles()

  return <BrushIcon fontSize="large" className={classes.rename} />
}
