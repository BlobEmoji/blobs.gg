import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DrawfestSubmissions from "../components/Drawfest/DrawfestSubmissions";
import Emoji from "../components/Emoji";
import { css } from "@emotion/react";

const DRAWFEST_ENDPOINT = "https://files.lostluma.dev/drawtober-2021.json";

const overHeader = css`
  text-align: center;
  margin: 2em 0 0.125em 0;
`;

const subHeader = css`
  text-align: center;
  margin: 0 0 2em 0;
`;

function PumpkinBlobEmoji() {
  return (
    <Emoji
      id="850869054046732289"
      name="ablobpumpkin"
      animated
      externalContainerStyle={css`
        margin: 0 0.25rem;
      `}
      disableTooltip
    />
  );
}

function DrawfestPage() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    if (apiData.length !== 0) {
      return;
    }

    const fetchData = async () => {
      const resp = await fetch(DRAWFEST_ENDPOINT);
      const data = await resp.json();
      setApiData(data);
    };
    fetchData();
  }, [apiData]);

  return (
    <Container
      css={css`
        padding-bottom: 24px;
      `}
      maxWidth="md"
    >
      <Typography variant="h5" css={overHeader}>
        <PumpkinBlobEmoji />
        We are currently running Drawfest 2021!
        <PumpkinBlobEmoji />
      </Typography>
      <Typography css={subHeader}>
        You may view how many approved submissions you have here.
      </Typography>
      <DrawfestSubmissions submissions={apiData} />
    </Container>
  );
}

DrawfestPage.whyDidYouRender = true;

export default DrawfestPage;
