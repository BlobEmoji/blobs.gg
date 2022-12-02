import { useCallback, useEffect, useState } from "react";
import OfficialServers from "../components/Home/OfficialServers";
import CommunityServers from "../components/Home/CommunityServers";
import { Emojis } from "../emojis";
import { calculateEmojiCount, formatEmojiCount, log } from "../utils";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Search from "../components/Home/Search";
import Link from "@mui/material/Link";
import { RawApiData } from "./homepage.types";
import { RawGuild } from "../types";

const INITIAL_EMOJI_COUNT = 4800;
const BLOBS_ENDPOINT = "https://api.mousey.app/v3/emoji/blobs+community-blobs";

const overHeaderStyle = {
  textAlign: "center",
  margin: "2em 0 0.125em 0",
};

const subHeaderStyle = {
  textAlign: "center",
  marginBottom: "2em",
};

function Homepage() {
  const [apiData, setApiData] = useState({ blobs: [], "community-blobs": [] } as RawApiData);
  const [fetched, setFetched] = useState(false);
  const [emojis, setEmojis] = useState({
    groups: { blobs: { guilds: [] }, "community-blobs": { guilds: [] } },
  });
  const [formattedCount, setFormattedCount] = useState(
    `Over ${formatEmojiCount(INITIAL_EMOJI_COUNT)}`
  );

  useEffect(() => {
    if (fetched) {
      return;
    }

    const fetchData = async () => {
      setFetched(true);
      const resp = await fetch(BLOBS_ENDPOINT);
      const data: RawApiData = await resp.json();
      setApiData(data);
    };
    fetchData();
  }, [apiData]);

  useEffect(() => {
    if (apiData.blobs.length === 0) {
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
  }, [apiData]);

  const officialEmojis = emojis.groups.blobs;
  const communityEmojis = emojis.groups["community-blobs"];

  return (
    <Container css={{ marginBottom: 24 }} maxWidth="md">
      <Typography variant="h5" css={overHeaderStyle}>
        {formattedCount} fun and playful Blob Emoji for Discord
      </Typography>
      <Typography css={subHeaderStyle}>
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
      <CommunityServers emojis={communityEmojis} waiting={waiting} />
    </Container>
  );
}

Homepage.whyDidYouRender = true;

export default Homepage;
