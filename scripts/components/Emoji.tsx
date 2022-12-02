import { forwardRef, MutableRefObject, ReactNode } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import { ConditionalLinkProps, EmojiProps } from "./Emoji.types";

function emojiUrl(id: string, extension: string, size: number | null) {
  const sizeParam = size == null ? "" : `?size=${size}`;
  return `https://cdn.discordapp.com/emojis/${id}.${extension}${sizeParam}`;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ConditionalLink = forwardRef(function ConditionalLink({ link, wrapper, children }: ConditionalLinkProps, ref: ((instance: (unknown | null)) => void) | MutableRefObject<unknown | null>) {
  return link ? wrapper(children, ref) : children;
});

function Emoji({
  id,
  animated,
  name,
  guild,
  baseSize = 64,
  showGuild,
  invite,
  externalContainerStyle,
  enlarge,
  disableTooltip,
}: EmojiProps) {
  const extension = animated ? "gif" : "png";
  let alt = `:${name}:`;

  if (guild != null && showGuild) {
    alt += ` (${guild.name})`;
  }

  const srcSet = `
    ${emojiUrl(id, extension, baseSize)},
    ${emojiUrl(id, extension, baseSize * 2)} 2x
  `;

  function wrapper(children: ReactNode) {
    return (
      <Link href={guild?.invite as string} target="_blank" rel="noopener">
        {children}
      </Link>
    );
  }

  return (
    <div
      css={[
        {
          display: "inline-block",
          verticalAlign: "middle",
        },
        invite && {
          margin: "1rem",
        },
        externalContainerStyle,
      ]}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-ignore*/}
      <ConditionalLink link={invite} wrapper={wrapper}>
        <Tooltip title={disableTooltip ? "" : alt} arrow>
          <Avatar
            alt={name}
            css={{
              width: enlarge ? 64 : 32,
              height: enlarge ? 64 : 32,
              img: {
                objectFit: "contain",
              },
            }}
            srcSet={srcSet}
            src={emojiUrl(id, extension, baseSize)}
            variant="square"
          />
        </Tooltip>
      </ConditionalLink>
    </div>
  );
}

Emoji.defaultProps = {
  invite: false,
  showGuild: false,
  enlarge: false,
  disableTooltip: false,
};

export default Emoji;
