import { PureComponent, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GuildAvatar } from "../Avatars";
import { shuffleArray } from "../../utils";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CardContent from "@mui/material/CardContent";
import Emoji from "../Emoji";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useInView } from "react-intersection-observer";
import { SkeletonEmojiRow } from "./SkeletonGuild";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const RANDOM_SAMPLE_SIZE = 7;

const expandStyle = (theme) =>
  css({
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  });

const expandOpenStyle = {
  transform: "rotate(180deg)",
};

function EmojiRow(props) {
  return props.emoji.map((emoji) => (
    <Emoji baseSize={emoji.animated ? 64 : 32} key={emoji.id} {...emoji} />
  ));
}

EmojiRow.propTypes = {
  emoji: PropTypes.array.isRequired,
};

function JoinServer(props) {
  return (
    <Button
      size="small"
      variant="contained"
      css={{
        textTransform: "none",
        color: "white",
      }}
      component={Link}
      href={props.invite}
      target="_blank"
      rel="noopener"
    >
      Join Server
    </Button>
  );
}

JoinServer.propTypes = {
  invite: PropTypes.string.isRequired,
};

function ShowMore(props) {
  const { expanded, emojiCount } = props;

  if (emojiCount <= RANDOM_SAMPLE_SIZE) {
    return null;
  }

  return (
    <IconButton
      onClick={props.handleClick}
      css={[(theme) => expandStyle(theme), expanded && expandOpenStyle]}
      name="Show More Emoji"
      aria-label="Show More Emoji"
    >
      <KeyboardArrowDownIcon />
    </IconButton>
  );
}

ShowMore.propTypes = {
  expanded: PropTypes.bool.isRequired,
  emojiCount: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
};

class GuildWrapper extends PureComponent {
  static whyDidYouRender = true;
  render() {
    return <Guild {...this.props} />;
  }
}

GuildWrapper.propTypes = {
  guild: PropTypes.object.isRequired,
  communityRender: PropTypes.func,
};

function Guild({ guild, communityRender }) {
  const [randomSample, setRandomSample] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [checkedCommunityRender, setCheckedCommunityRender] = useState(false);
  const quarterScreenHeightInPx = (window.innerHeight * 25) / 100;
  const [ref, inView, entry] = useInView({
    triggerOnce: true,
    rootMargin: `0px 0px ${quarterScreenHeightInPx}px 0px`,
  });

  const EmojiRowContainer = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    margin: "0 0.3rem",
    gap: "0.6rem 0.3rem",
    justifyItems: "center",
  });

  useEffect(() => {
    if (randomSample.length === 0) {
      setRandomSample(shuffleArray(guild.emoji).slice(0, RANDOM_SAMPLE_SIZE));
    }
  });

  const handleClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!checkedCommunityRender) {
      if (communityRender) {
        communityRender();
      }
      setCheckedCommunityRender(true);
    }
  });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card ref={ref}>
        <CardHeader
          avatar={<GuildAvatar name={guild.name} src={guild} />}
          title={guild.name}
          onClick={handleClick}
          css={{
            cursor: "pointer",
            userSelect: "none",
          }}
          action={
            <ShowMore
              handleClick={handleClick}
              expanded={expanded}
              emojiCount={guild.emoji.length}
            />
          }
          titleTypographyProps={{ style: { fontSize: "1em" } }}
        />
        <CardContent>
          {inView ? (
            <EmojiRowContainer>
              <EmojiRow emoji={expanded ? guild.emoji : randomSample} />
            </EmojiRowContainer>
          ) : (
            <SkeletonEmojiRow />
          )}
        </CardContent>
        <CardActions>
          <JoinServer invite={guild.invite} />
        </CardActions>
      </Card>
    </Grid>
  );
}

Guild.propTypes = {
  guild: PropTypes.object.isRequired,
  communityRender: PropTypes.func,
};

Guild.whyDidYouRender = true;

export default GuildWrapper;
