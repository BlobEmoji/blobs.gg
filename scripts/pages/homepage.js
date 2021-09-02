import React, { useCallback, useEffect, useState } from "react";
import OfficialServers from "../components/Home/OfficialServers";
import CommunityServers from "../components/Home/CommunityServers";
import { Emojis } from "../emojis";
import { calculateEmojiCount, formatEmojiCount, log } from "../utils";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Search from "../components/Home/Search";
import makeStyles from "@mui/styles/makeStyles";
import Link from "@mui/material/Link";

const INITIAL_EMOJI_COUNT = 4400;
const BLOBS_ENDPOINT = "https://api.mousey.app/v3/emoji/blobs+community-blobs";

const useStyles = makeStyles((theme) => ({
  overHeader: {
    textAlign: "center",
    margin: "2em 0 0.125em 0",
  },
  subHeader: {
    textAlign: "center",
    margin: "0 0 2em 0",
  },
  licenseContainer: {
    margin: "2rem 0",
  },
  inlineIcon: {
    height: "0.8em",
    width: "auto",
    margin: "0 0.25em",
    filter: theme.palette.mode === "light" && "invert(1)",
  },
  bottomMargin: {
    paddingBottom: "24px",
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
    <Container className={classes.bottomMargin} maxWidth="md">
      <Typography variant="h5" className={classes.overHeader}>
        {formattedCount} fun and playful Blob Emoji for Discord
      </Typography>
      <Typography className={classes.subHeader}>
        Created by the Blob Emoji community.&nbsp;
        <Link
          underline="hover"
          href="https://1.blobs.gg/"
          target="_blank"
          rel="noopener"
        >
          Come join us!
        </Link>
      </Typography>
      <Search emojis={emojis} />
      <OfficialServers
        emojis={officialEmojis}
        communityRender={communityRender}
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
