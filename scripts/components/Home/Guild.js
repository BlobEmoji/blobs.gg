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
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import clsx from "clsx";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useInView } from "react-intersection-observer";
import { SkeletonEmojiRow } from "./SkeletonGuild";

const RANDOM_SAMPLE_SIZE = 7;
const useStyles = makeStyles((theme) => ({
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
  return props.emoji.map((emoji) => (
    <Emoji baseSize={emoji.animated ? 64 : 32} key={emoji.id} {...emoji} />
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
  const classes = useStyles();
  const [randomSample, setRandomSample] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [checkedCommunityRender, setCheckedCommunityRender] = useState(false);
  const quarterScreenHeightInPx = (window.innerHeight * 25) / 100;
  const [ref, inView, entry] = useInView({
    triggerOnce: true,
    rootMargin: `0px 0px ${quarterScreenHeightInPx}px 0px`,
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
          titleTypographyProps={{ style: { fontSize: "1em" } }}
        />
        <CardContent>
          {inView ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                margin: "0 0.3rem",
                gap: "0.6rem 0.3rem",
                justifyItems: "center",
              }}
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

Guild.whyDidYouRender = true;

export default GuildWrapper;
