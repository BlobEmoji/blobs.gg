import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GuildAvatar } from "../Avatars";
import { shuffleArray } from "../../utils";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CardContent from "@material-ui/core/CardContent";
import Emoji from "../Emoji";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { useInView } from "react-intersection-observer";
import { SkeletonEmojiRow } from "./SkeletonGuild";

const RANDOM_SAMPLE_SIZE = 7;
const useStyles = makeStyles((theme) => ({
  cell: {
    margin: "0.3rem",
  },
  joinServer: {
    textTransform: "none",
    color: "white",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  header: {
    cursor: "pointer",
    userSelect: "none",
  },
}));

function EmojiRow(props) {
  const classes = useStyles();

  return props.emoji.map((emoji) => (
    <Emoji
      baseSize={emoji.animated ? 64 : 32}
      key={emoji.id}
      {...emoji}
      containerClassName={classes.cell}
    />
  ));
}

EmojiRow.propTypes = {
  emoji: PropTypes.array.isRequired,
};

function JoinServer(props) {
  const classes = useStyles();

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      className={classes.joinServer}
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
  const classes = useStyles();
  const { expanded, emojiCount } = props;

  if (emojiCount <= RANDOM_SAMPLE_SIZE) {
    return null;
  }

  return (
    <IconButton
      onClick={props.handleClick}
      className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
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

function Guild({ guild, communityRender }) {
  const classes = useStyles();
  const [randomSample, setRandomSample] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [checkedCommunityRender, setCheckedCommunityRender] = useState(false);
  const quarterScreenHeightInPx = window.innerHeight * 25 / 100;
  const [ref, inView, entry] = useInView({
    triggerOnce: true,
    rootMargin: `0px 0px ${quarterScreenHeightInPx}px 0px`
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
          className={classes.header}
          action={
            <ShowMore
              handleClick={handleClick}
              expanded={expanded}
              emojiCount={guild.emoji.length}
            />
          }
          titleTypographyProps={{ style: { fontSize: "1.17em" } }}
        />
        <CardContent>
          {inView ? (
            <Box
              display="flex"
              justifyContent="space-around"
              margin="-0.3rem 0"
              padding="0 0.1rem"
            >
              <EmojiRow emoji={expanded ? guild.emoji : randomSample} />
            </Box>
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

export default Guild;
