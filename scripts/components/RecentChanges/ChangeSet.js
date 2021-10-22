import { Component } from "react";
import PropTypes from "prop-types";
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

const emojiAction = {
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

function ChangeSet({ changeSet }) {
  const date = new Date(changeSet[0].changed_at);
  let guild = changeSet[0].guild;
  guild.id = guild.id.toString();

  let hasMore = false;
  let collapsedChangeSet = [];
  let collapsedRows = null;

  function rows(change, index) {
    const EventIcon = emojiAction[change.event];

    const emoji = change.emoji || change.before;
    const afterEmoji = change.after || null;

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

ChangeSet.propTypes = {
  changeSet: PropTypes.array.isRequired,
};

ChangeSet.whyDidYouRender = true;

class ChangeSetWrapper extends Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.changeSet.length !== this.props.changeSet.length;
  }

  render() {
    return <ChangeSet {...this.props} />;
  }
}

ChangeSetWrapper.propTypes = ChangeSet.propTypes;

export default ChangeSetWrapper;
