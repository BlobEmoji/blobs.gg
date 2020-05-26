import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import React from 'react'

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

export function RemoveAvatar() {
  return (
    <Avatar
      alt="Removed"
      src="https://cdn.discordapp.com/emojis/567088349484023818.png?v=1"
      variant="square"
    />
  )
}

export function CreateAvatar() {
  return (
    <Avatar
      alt="Created"
      src="https://cdn.discordapp.com/emojis/567088336166977536.png?v=1"
      variant="square"
    />
  )
}

export function RenameAvatar() {
  return (
    <Avatar
      alt="Renamed"
      src="https://discordapp.com/assets/b37d783fa2330771124219f7f13f2f31.svg"
      variant="square"
    />
  )
}

export function UpdateAvatar() {
  return (
    <Avatar
      alt="Updated"
      src="https://discordapp.com/assets/e1ec53c5d89c0291001989a36716aa9a.svg"
      variant="square"
    />
  )
}
