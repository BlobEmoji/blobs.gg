import { getDateTimeFormatter, titleCase } from "../../utils";
import Emoji from "../Emoji";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import { ChangeRowProps } from "./ChangeRow.types";

const RowDiv = styled.div({
  display: "flex",
  alignItems: "center",
  fontSize: "0.875rem",
});

const EventDiv = styled.div({
  display: "flex",
  alignItems: "center",
  minWidth: "7.1rem",
});

const iconContainerStyle = {
  margin: "0.5rem",
};

const ToDiv = styled.div({
  padding: "0.25rem",
});

const TextDiv = styled.div({
  padding: "0.25rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function ChangeRow({ eventIcon, eventName, emoji, afterEmoji, changedAt }: ChangeRowProps) {
  return (
    <RowDiv>
      <EventDiv>
        <div css={iconContainerStyle}>
          <Tooltip
            title={getDateTimeFormatter().format(new Date(changedAt))}
            arrow
          >
            <div>{eventIcon}</div>
          </Tooltip>
        </div>
        <span>{`${titleCase(eventName)}d`}</span>
      </EventDiv>
      <Emoji
        baseSize={32}
        externalContainerStyle={iconContainerStyle}
        {...emoji}
      />
      {afterEmoji ? (
        <>
          <ToDiv>to</ToDiv>
          <Emoji
            baseSize={32}
            externalContainerStyle={iconContainerStyle}
            {...afterEmoji}
          />
          <TextDiv>{afterEmoji.name}</TextDiv>
        </>
      ) : (
        <TextDiv>{emoji.name}</TextDiv>
      )}
    </RowDiv>
  );
}

export default ChangeRow;
