import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DrawfestSubmissions from "../components/Drawfest/DrawfestSubmissions";
import Emoji from "../components/Emoji";

const DRAWFEST_ENDPOINT = "https://files.lostluma.dev/drawtober-2021.json";

const overHeaderStyle = {
  textAlign: "center",
  margin: "2em 0 0.125em 0",
};

const subHeaderStyle = {
  textAlign: "center",
  marginBottom: "2em",
};

function PumpkinBlobEmoji() {
  return (
    <Emoji
      id="850869054046732289"
      name="ablobpumpkin"
      animated
      externalContainerStyle={{
        margin: "0 0.25rem",
      }}
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
    <Container css={{ paddingBottom: "24px" }} maxWidth="md">
      <Typography variant="h5" css={overHeaderStyle}>
        <PumpkinBlobEmoji />
        We are currently running Drawfest 2021!
        <PumpkinBlobEmoji />
      </Typography>
      <Typography css={subHeaderStyle}>
        You may view how many approved submissions you have here.
      </Typography>
      <DrawfestSubmissions submissions={apiData} />
    </Container>
  );
}

DrawfestPage.whyDidYouRender = true;

export default DrawfestPage;
