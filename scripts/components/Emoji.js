import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  div: {
    width: 'inherit',
    height: 'inherit',
    verticalAlign: 'middle',
    display: 'inline-block',
  },
  emoji: {
    objectFit: 'contain',
  },
  box: {
    margin: '1rem',
  },
})

function emojiUrl(id, extension, size) {
  const sizeParam = size == null ? '' : `?size=${size}`
  return `https://cdn.discordapp.com/emojis/${id}.${extension}${sizeParam}`
}

const ConditionalLink = forwardRef(function ConditionalLink(props, ref) {
  return props.link ? props.wrapper(props.children, ref) : props.children
})

ConditionalLink.propTypes = {
  link: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  wrapper: PropTypes.any.isRequired,
}

function Emoji(props) {
  const {
    id,
    animated,
    name,
    guild,
    baseSize,
    showGuild,
    className,
  } = props
  const extension = animated ? 'gif' : 'png'
  const classes = useStyles()
  let alt = `:${name}:`

  if (guild != null && showGuild) {
    alt += ` (${guild.name})`
  }

  const srcSet = `
    ${emojiUrl(id, extension, baseSize)},
    ${emojiUrl(id, extension, baseSize * 2)} 2x
  `

  function wrapper(children) {
    return <Link href={guild.invite}>{children}</Link>
  }

  return (
    <Box
      display="inline-block" width={baseSize} height={baseSize}
      className={clsx(props.invite && classes.box, props.boxClassName)}>
      <ConditionalLink link={props.invite} wrapper={wrapper}>
        <Tooltip title={alt} arrow>
          <Avatar
            alt={name}
            classes={{
              img: classes.emoji,
            }}
            srcSet={srcSet}
            src={emojiUrl(id, extension, baseSize)}
            variant="square"
            className={clsx(classes.div, className)}
          />
        </Tooltip>
      </ConditionalLink>
    </Box>
  )
}

Emoji.propTypes = {
  id: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  guild: PropTypes.object,
  baseSize: PropTypes.number,
  showGuild: PropTypes.bool,
  className: PropTypes.string,
  invite: PropTypes.bool,
  boxClassName: PropTypes.string,
}

Emoji.defaultProps = {
  invite: false,
  baseSize: 64,
  showGuild: false,
  boxClassName: '',
}

export default Emoji
