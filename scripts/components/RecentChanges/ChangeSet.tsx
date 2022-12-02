import { Component } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {
  CreateAvatar,
  GuildAvatar,
  RemoveAvatar,
  RenameAvatar,
  UpdateAvatar,
} from "../Avatars";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDateTimeFormatter } from "../../utils";
import ChangeRow from "./ChangeRow";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { ChangeEvent, ChangeSetProps, ChangeSetWrapperClassProps } from "./ChangeSet.types";

export const emojiAction = {
  EMOJI_REMOVE: <RemoveAvatar />,
  EMOJI_CREATE: <CreateAvatar />,
  EMOJI_RENAME: <RenameAvatar />,
  EMOJI_UPDATE: <UpdateAvatar />,
};

const StyledAccordionSummary = styled(AccordionSummary)({
  fontSize: "0.875rem",
});

const StyledAccordionDetails = styled(AccordionDetails)({
  flexDirection: "column",
});

const DEFAULT_MAXIMUM = 10;

function ChangeSet({ changeSet }: ChangeSetProps) {
  const date = new Date(changeSet[0].changed_at);
  const guild = changeSet[0].guild;
  guild.id = guild.id.toString();

  let hasMore = false;
  let collapsedChangeSet = [];
  let collapsedRows = null;

  function rows(change: ChangeEvent, index: number) {
    const EventIcon = emojiAction[change.event];

    let emoji;
    let afterEmoji = null;
    switch (change.event) {
      case "EMOJI_CREATE":
      case "EMOJI_REMOVE":
        emoji = change.emoji;
        break;
      case "EMOJI_RENAME":
      case "EMOJI_UPDATE":
        emoji = change.before;
        afterEmoji = change.after;
        break;
    }

    return (
      <ChangeRow
        key={`${change.changed_at}-${index}`}
        eventIcon={EventIcon}
        eventName={change.event.split("_")[1]}
        emoji={emoji}
        afterEmoji={afterEmoji}
        changedAt={change.changed_at}
      />
    );
  }

  if (changeSet.length > DEFAULT_MAXIMUM) {
    hasMore = true;
    collapsedChangeSet = changeSet.slice(DEFAULT_MAXIMUM);
    collapsedRows = collapsedChangeSet.map(rows);
    changeSet = changeSet.slice(0, DEFAULT_MAXIMUM);
  }

  const blobs = changeSet.map(rows);

  return (
    <Grid item xs={12} sm={6}>
      <Card>
        <CardHeader
          avatar={<GuildAvatar name={guild.name} src={guild} />}
          title={guild.name}
          subheader={getDateTimeFormatter().format(date)}
        />
        {blobs}
        {hasMore && (
          <Accordion>
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Panel Controls"
            >
              {`See ${collapsedChangeSet.length} more changes`}
            </StyledAccordionSummary>
            <StyledAccordionDetails>{collapsedRows}</StyledAccordionDetails>
          </Accordion>
        )}
      </Card>
    </Grid>
  );
}

ChangeSet.whyDidYouRender = true;

class ChangeSetWrapper extends Component<ChangeSetWrapperClassProps> {
  shouldComponentUpdate(nextProps: ChangeSetProps, nextState: ChangeSetProps) {
    return nextProps.changeSet.length !== this.props.changeSet.length;
  }

  render() {
    return <ChangeSet changeSet={this.props.changeSet} />;
  }
}

export default ChangeSetWrapper;
