import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  container: {
    width: (props) => (props.enlarge ? 64 : 32),
    height: (props) => (props.enlarge ? 64 : 32),
    display: "inline-block",
  },
  div: {
    width: "inherit",
    height: "inherit",
    verticalAlign: "middle",
    display: "inline-block",
    backgroundColor: "transparent",
  },
  inviteContainer: {
    margin: "1rem",
  },
  // The Link component must inherit the size, or else its children won't have the correct size
  link: {
    width: "inherit",
    height: "inherit",
  },
});

function emojiUrl(id, extension, size, webpTest = false) {
  const sizeParam = size == null ? "" : `?size=${size}`;
  return `https://cdn.discordapp.com/emojis/${id}.${
    webpTest && extension !== "gif" ? "webp" : extension
  }${sizeParam}`;
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
    className,
    enlarge,
  } = props;
  const extension = animated ? "gif" : "png";
  const classes = useStyles(props);
  let alt = `:${name}:`;

  if (guild != null && showGuild) {
    alt += ` (${guild.name})`;
  }

  function wrapper(children) {
    return (
      <Link
        className={classes.link}
        href={guild.invite}
        target="_blank"
        rel="noopener"
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={clsx(
        classes.container,
        props.invite && classes.inviteContainer,
        props.containerClassName
      )}
    >
      <ConditionalLink link={props.invite} wrapper={wrapper}>
        <Tooltip title={alt} arrow>
          <Avatar
            alt={name}
            variant="square"
            className={clsx(classes.div, className)}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={emojiUrl(id, extension, baseSize, true)}
              />
              <img
                src={emojiUrl(id, extension, baseSize)}
                alt={name}
                style={{ width: enlarge ? 64 : 32, height: enlarge ? 64 : 32 }}
              />
            </picture>
          </Avatar>
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
  className: PropTypes.string,
  invite: PropTypes.bool,
  containerClassName: PropTypes.string,
  enlarge: PropTypes.bool,
};

Emoji.defaultProps = {
  invite: false,
  baseSize: 64,
  showGuild: false,
  containerClassName: "",
  enlarge: false,
};

export default Emoji;
