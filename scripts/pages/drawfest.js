import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import DrawfestSubmissions from "../components/Drawfest/DrawfestSubmissions";
import Emoji from "../components/Emoji";

const DRAWFEST_ENDPOINT = "https://files.lostluma.dev/drawtober-2021.json";

const useStyles = makeStyles({
  overHeader: {
    textAlign: "center",
    margin: "2em 0 0.125em 0",
  },
  subHeader: {
    textAlign: "center",
    margin: "0 0 2em 0",
  },
  bottomMargin: {
    paddingBottom: "24px",
  },
  emojiContainer: {
    margin: "0 0.25rem",
  },
});

function PumpkinBlobEmoji() {
  const classes = useStyles();

  return (
    <Emoji
      id="850869054046732289"
      name="ablobpumpkin"
      animated
      containerClassName={classes.emojiContainer}
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

  const classes = useStyles();

  return (
    <Container className={classes.bottomMargin} maxWidth="md">
      <Typography variant="h5" className={classes.overHeader}>
        <PumpkinBlobEmoji />
        We are currently running Drawfest 2021!
        <PumpkinBlobEmoji />
      </Typography>
      <Typography className={classes.subHeader}>
        You may view how many approved submissions you have here.
      </Typography>
      <DrawfestSubmissions submissions={apiData} />
    </Container>
  );
}

DrawfestPage.whyDidYouRender = true;

export default DrawfestPage;
