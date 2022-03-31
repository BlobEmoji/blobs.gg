import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Emoji from "../Emoji";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

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

function BolbEmoji() {
  return (
    <Emoji
      id="453933426555486208"
      name="bolb"
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
      externalContainerStyle={{
        margin: "0 0.25rem",
      }}
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
        <BolbEmoji />
        We are currently running April Fools 2022!
        <BolbEmoji />
      </Typography>
      <Typography css={subHeaderStyle}>
        As part of this event, some characters are just too expensive to render.
      </Typography>
      <Typography css={subSubHeaderStyle}>
        As such, we are running a translation service to translate the 💰
        characters into more affordable ones
      </Typography>
      <TextField
        name="Type in your heresy blob text"
        type="text"
        placeholder="Type in your heresy blob text"
        value={value}
        onChange={translateText}
        fullWidth
        variant="filled"
        color="secondary"
        inputProps={{
          "aria-label": "Type in your heresy blob text",
        }}
      />
      <Divider css={dividerStyle} />
      <TextField
        name="Your translated heresy blob text"
        type="text"
        placeholder="Your translated heresy blob text"
        value={heresyText}
        fullWidth
        variant="filled"
        color="secondary"
        inputProps={{
          "aria-label": "Your translated heresy blob text",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={clipboard}>
              <ClipboardBlobEmoji />
            </InputAdornment>
          ),
        }}
        disabled
      />
    </Container>
  );
}

export default AprilTranslate;
