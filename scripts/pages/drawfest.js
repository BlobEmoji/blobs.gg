import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DrawfestSubmissions from "../components/Drawfest/DrawfestSubmissions";
import Emoji from "../components/Emoji";
import { useParams } from "react-router-dom";

const DRAWFEST_ENDPOINT =
  "https://api.blobs.gg/v1/events/drawfest/{year}/{type}";

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

function SantaBlobEmoji() {
  return (
    <Emoji
      id="661861326888370186"
      name="blobsanta"
      externalContainerStyle={{ margin: "0 0.25rem" }}
      disableTooltip
      animated={false}
    />
  );
}

function DrawfestPage() {
  const [apiData, setApiData] = useState([]);
  const [apiDataFetched, setApiDataFetched] = useState(false);
  const [promptData, setPromptData] = useState([]);
  const [promptDataFetched, setPromptDataFetched] = useState(false);
  const { year } = useParams();
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    if (apiDataFetched) {
      return;
    }
    const fetchData = async () => {
      const resp = await fetch(
        DRAWFEST_ENDPOINT.replace("{year}", year).replace("{type}", "digest")
      );
      const data = await resp.json();
      setApiData(data);
      setApiDataFetched(true);
    };
    fetchData();
  }, [apiData, apiDataFetched]);

  useEffect(() => {
    if (promptDataFetched) {
      return;
    }

    const fetchData = async () => {
      const resp = await fetch(
        DRAWFEST_ENDPOINT.replace("{year}", year).replace("{type}", "prompts")
      );
      const data = await resp.json();
      setPromptData(data);
      setPromptDataFetched(true);
    };
    fetchData();
  }, [promptData, promptDataFetched]);

  return (
    <Container css={{ paddingBottom: 24 }} maxWidth="md">
      <Typography variant="h5" css={overHeaderStyle}>
        {month === 10 ? <PumpkinBlobEmoji /> : <SantaBlobEmoji />}
        We are currently running Drawfest {year}!
        {month === 10 ? <PumpkinBlobEmoji /> : <SantaBlobEmoji />}
      </Typography>
      <Typography css={subHeaderStyle}>
        You may view how many approved submissions you have here.
      </Typography>
      <DrawfestSubmissions submissions={apiData} promptData={promptData} />
    </Container>
  );
}

DrawfestPage.whyDidYouRender = true;

export default DrawfestPage;
