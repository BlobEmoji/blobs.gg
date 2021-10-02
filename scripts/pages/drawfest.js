import React, { useCallback, useEffect, useState } from "react";
import OfficialServers from "../components/Home/OfficialServers";
import CommunityServers from "../components/Home/CommunityServers";
import { Emojis } from "../emojis";
import { calculateEmojiCount, formatEmojiCount, log } from "../utils";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Search from "../components/Home/Search";
import makeStyles from "@material-ui/styles/makeStyles";
import Link from "@material-ui/core/Link";
import DrawfestSubmissions from "../components/Drawfest/DrawfestSubmissions";

const INITIAL_EMOJI_COUNT = 4400;
const BLOBS_ENDPOINT = "https://files.lostluma.dev/drawtober-2021.json";

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

function Drawfest() {
  const [apiData, setApiData] = useState([]);
  const [emojis, setEmojis] = useState({
    groups: { blobs: { guilds: [] }, "community-blobs": { guilds: [] } },
  });
  const [formattedCount, setFormattedCount] = useState(
    `Over ${formatEmojiCount(INITIAL_EMOJI_COUNT)}`
  );

  useEffect(() => {
    if (apiData.length > 0) {
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

  const classes = useStyles();

  return (
    <Container className={classes.bottomMargin} maxWidth="md">
      <Typography variant="h5" className={classes.overHeader}>
        🎃We are currently running Drawfest!🎃
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
      <DrawfestSubmissions submissions={apiData} />
    </Container>
  );
}

Drawfest.whyDidYouRender = true;

export default Drawfest;
