import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/styles/makeStyles";
import clsx from "clsx";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  container: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  emoji: {
    objectFit: "contain",
  },
  inviteContainer: {
    margin: "1rem",
  },
});

function emojiUrl(id, extension, size) {
  const sizeParam = size == null ? "" : `?size=${size}`;
  return `https://cdn.discordapp.com/emojis/${id}.${extension}${sizeParam}`;
}

const ConditionalLink = forwardRef(function ConditionalLink(props, ref) {
  return props.link ? props.wrapper(props.children, ref) : props.children;
});

ConditionalLink.propTypes = {
  link: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  wrapper: PropTypes.any.isRequired,
};

function Emoji(props) {
  const {
    id,
    animated,
    name,
    guild,
    baseSize,
    showGuild,
    invite,
    containerClassName,
    enlarge,
    tooltipDisabled,
  } = props;
  const extension = animated ? "gif" : "png";
  const classes = useStyles(props);
  let alt = `:${name}:`;

  if (guild != null && showGuild) {
    alt += ` (${guild.name})`;
  }

  const srcSet = `
    ${emojiUrl(id, extension, baseSize)},
    ${emojiUrl(id, extension, baseSize * 2)} 2x
  `;

  function wrapper(children) {
    return (
      <Link href={guild.invite} target="_blank" rel="noopener">
        {children}
      </Link>
    );
  }

  return (
    <div
      className={clsx(
        classes.container,
        invite && classes.inviteContainer,
        containerClassName
      )}
    >
      <ConditionalLink link={invite} wrapper={wrapper}>
        <Tooltip title={tooltipDisabled ? "" : alt} arrow>
          <Avatar
            alt={name}
            classes={{
              img: classes.emoji,
            }}
            srcSet={srcSet}
            src={emojiUrl(id, extension, baseSize)}
            sx={{
              width: enlarge ? 64 : 32,
              height: enlarge ? 64 : 32,
            }}
            variant="square"
          />
        </Tooltip>
      </ConditionalLink>
    </div>
  );
}

Emoji.propTypes = {
  id: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  guild: PropTypes.object,
  baseSize: PropTypes.number,
  showGuild: PropTypes.bool,
  invite: PropTypes.bool,
  containerClassName: PropTypes.string,
  enlarge: PropTypes.bool,
  tooltipDisabled: PropTypes.bool,
};

Emoji.defaultProps = {
  invite: false,
  baseSize: 64,
  showGuild: false,
  containerClassName: "",
  enlarge: false,
  tooltipDisabled: false,
};

export default Emoji;
