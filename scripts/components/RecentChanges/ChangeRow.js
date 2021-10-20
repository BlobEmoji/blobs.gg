import PropTypes from "prop-types";
import { getDateTimeFormatter, titleCase } from "../../utils";
import Emoji from "../Emoji";
import Tooltip from "@mui/material/Tooltip";
import { css } from "@emotion/react";

const rowDivStytle = css`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

const eventDivStytle = css`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

const iconContainerStyle = css`
  margin: 0.5rem;
`;

const toStyle = css`
  padding: 0.25rem;
`;

const textStyle = css`
  padding: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ChangeRow({ eventIcon, eventName, emoji, afterEmoji, changedAt }) {
  return (
    <div css={rowDivStytle}>
      <div css={eventDivStytle}>
        <div css={iconContainerStyle}>
          <Tooltip
            title={getDateTimeFormatter().format(new Date(changedAt))}
            arrow
          >
            <div>{eventIcon}</div>
          </Tooltip>
        </div>
        <span>{`${titleCase(eventName)}d`}</span>
      </div>
      <Emoji
        baseSize={32}
        externalContainerStyle={iconContainerStyle}
        {...emoji}
      />
      {afterEmoji ? (
        <>
          <div css={toStyle}>to</div>
          <Emoji
            baseSize={32}
            externalContainerStyle={iconContainerStyle}
            {...afterEmoji}
          />
          <div css={textStyle}>{afterEmoji.name}</div>
        </>
      ) : (
        <div css={textStyle}>{emoji.name}</div>
      )}
    </div>
  );
}

ChangeRow.propTypes = {
  eventIcon: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  emoji: PropTypes.object.isRequired,
  afterEmoji: PropTypes.object,
  changedAt: PropTypes.string.isRequired,
};

export default ChangeRow;
