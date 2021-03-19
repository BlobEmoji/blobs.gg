import React, { useCallback, useEffect, useState } from "react";
import OfficialServers from "../components/Home/OfficialServers";
import CommunityServers from "../components/Home/CommunityServers";
import { Emojis } from "../emojis";
import { calculateEmojiCount, formatEmojiCount, log } from "../utils";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Search from "../components/Home/Search";
import makeStyles from "@material-ui/core/styles/makeStyles";

const INITIAL_EMOJI_COUNT = 4400;
const BLOBS_ENDPOINT = "https://api.mousey.app/v3/emoji/blobs+community-blobs";

const useStyles = makeStyles((theme) => ({
  overHeader: {
    textAlign: "center",
    margin: "2em 0",
  },
  licenceContainer: {
    margin: "2rem 0",
  },
  margin: {
    marginBottom: "1rem",
  },
  inlineIcon: {
    height: "0.8em",
    width: "auto",
    margin: "0 0.25em",
    filter: theme.palette.type === "light" && "invert(1)",
  },
}));

function Homepage() {
  const [apiData, setApiData] = useState({});
  const [emojis, setEmojis] = useState({
    groups: { blobs: { guilds: [] }, "community-blobs": { guilds: [] } },
  });
  const [formattedCount, setFormattedCount] = useState(
    `Over ${formatEmojiCount(INITIAL_EMOJI_COUNT)}`
  );

  useEffect(() => {
    if (apiData.hasOwnProperty("blobs")) {
      return;
    }

    const fetchData = async () => {
      const resp = await fetch(BLOBS_ENDPOINT);
      const data = await resp.json();
      setApiData(data);
    };
    fetchData();
  }, [apiData]);

  useEffect(() => {
    if (!apiData.hasOwnProperty("blobs")) {
      return;
    }

    const newEmojis = new Emojis(apiData);
    const count = calculateEmojiCount(apiData);

    log("Emojis:", newEmojis);

    setEmojis(newEmojis);
    setFormattedCount(formatEmojiCount(count));
  }, [apiData]);

  const [waiting, setWaiting] = useState(true);

  const communityRender = useCallback(function communityRender() {
    setWaiting(false);
  }, []);

  const classes = useStyles();
  const officialEmojis = emojis.groups.blobs;
  const communityEmojis = emojis.groups["community-blobs"];

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className={classes.overHeader}>
        {formattedCount} fun and playful Blob Emoji for Discord
      </Typography>
      <Search emojis={emojis} />
      <OfficialServers
        emojis={officialEmojis}
        communityRender={communityRender}
        classes={classes}
      />
      <CommunityServers
        emojis={communityEmojis}
        waiting={waiting}
        classes={classes}
      />
    </Container>
  );
}

Homepage.whyDidYouRender = true;

export default Homepage;
