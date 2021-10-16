import { forwardRef } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import { css } from "@emotion/react";

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
    externalContainerStyle,
    enlarge,
    disableTooltip,
  } = props;
  const extension = animated ? "gif" : "png";
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
      css={[
        css`
          display: inline-block;
          vertical-align: middle;
        `,
        invite &&
          css`
            margin: 1rem;
          `,
        externalContainerStyle,
      ]}
    >
      <ConditionalLink link={invite} wrapper={wrapper}>
        <Tooltip title={disableTooltip ? "" : alt} arrow>
          <Avatar
            alt={name}
            css={{
              img: css`
                object-fit: contain;
              `,
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
  externalContainerStyle: PropTypes.object,
  enlarge: PropTypes.bool,
  disableTooltip: PropTypes.bool,
};

Emoji.defaultProps = {
  invite: false,
  baseSize: 64,
  showGuild: false,
  enlarge: false,
  disableTooltip: false,
};

export default Emoji;
