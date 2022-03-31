import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Emoji from "../Emoji";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const overHeaderStyle = {
  textAlign: "center",
  margin: "2em 0 0.125em 0",
};

const subHeaderStyle = {
  textAlign: "center",
};

const subSubHeaderStyle = {
  textAlign: "center",
  marginBottom: "2em",
};

const dividerStyle = {
  margin: "1em 0",
};

const heresyCharacters = {
  e: ["é", "è", "ê", "ë"],
  g: ["ğ", "ĝ", "ġ", "ģ"],
  w: ["ŵ"],
  c: ["ç"],
  E: ["É", "È", "Ê", "Ë"],
  G: ["Ğ", "Ĝ", "Ġ", "Ģ"],
  W: ["Ŵ"],
  C: ["Ç"],
};

function MoneyBagEmoji() {
  return (
    <Emoji
      id="959232720314200134"
      name="googlemoneybag"
      animated={false}
      externalContainerStyle={{
        margin: "0 0.25rem",
      }}
      disableTooltip
    />
  );
}

function ClipboardBlobEmoji() {
  return (
    <Emoji
      id="696784715428004001"
      name="blobclipboard"
      animated={false}
      disableTooltip
    />
  );
}

function AprilTranslate() {
  const [value, setValue] = useState("");
  const [heresyText, setHerseyText] = useState("");

  const translateText = (event) => {
    setValue(event.target.value);
    let newText = "";
    for (const character of event.target.value) {
      if (Object.keys(heresyCharacters).includes(character)) {
        newText +=
          heresyCharacters[character][
            Math.floor(Math.random() * heresyCharacters[character].length)
          ];
      } else {
        newText += character;
      }
    }
    setHerseyText(newText);
  };

  const clipboard = async () => {
    try {
      await navigator.clipboard.writeText(heresyText);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container css={{ paddingBottom: 24 }} maxWidth="md">
      <Typography variant="h5" css={overHeaderStyle}>
        <MoneyBagEmoji />
        Meet the limited budget with our Message Cheapifier!
        <MoneyBagEmoji />
      </Typography>
      <Typography css={subHeaderStyle}>
        Unfortunately, we couldn't afford to use Cs, Es, Gs and Ws on this
        server anymore.
      </Typography>
      <Typography css={subSubHeaderStyle}>
        As such, we have this service for replacing the scarce letters with
        still available ones!
      </Typography>
      <TextField
        name="Type in the message to be cheapified"
        type="text"
        placeholder="Type in the message to be cheapified"
        value={value}
        onChange={translateText}
        fullWidth
        variant="filled"
        color="secondary"
        inputProps={{
          "aria-label": "Type in the message to be cheapified",
        }}
      />
      <Divider css={dividerStyle} />
      <TextField
        name="Your cheapified message"
        type="text"
        placeholder="Your cheapified message"
        value={heresyText}
        fullWidth
        variant="filled"
        color="secondary"
        inputProps={{
          "aria-label": "Your cheapified message",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={clipboard}>
                <ClipboardBlobEmoji />
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
      />
    </Container>
  );
}

export default AprilTranslate;
