import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Homepage from "./pages/homepage";
import { getDefaultHourFormat, getKeyWrapper } from "./utils";
import Changepage from "./pages/changepage";
import Header from "./components/Header";
import Container from "@material-ui/core/Container";
import grey from "@material-ui/core/colors/grey";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SettingsDialog from "./components/SettingsDialog";

function getConfig() {
  let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const defaultHoursFormat = getDefaultHourFormat();

  // eslint-disable-next-line no-unused-vars
  const [resPDM, resPDMLS] = getKeyWrapper("darkTheme", prefersDarkMode);
  // eslint-disable-next-line no-unused-vars
  const [resHF, resHFLS] = getKeyWrapper("prefers12Hour", defaultHoursFormat);
  return { prefersDarkMode: resPDM, prefersHour12: resHF };
}

// Taken from https://github.com/mui-org/material-ui/blob/27471b4564eb40ff769352d73a29938d25804e45/packages/material-ui/src/styles/createTypography.js#L45
const htmlFontSize = 16;
const fontSize = 14;
const coef = fontSize / 14;
const pxToRem = (size) => `${(size / htmlFontSize) * coef}rem`;

function App() {
  const [settingsOpen, toggleSettingsOpen] = useState(false);
  const [, handleReload] = useState(0);
  const { prefersDarkMode, prefersHour12 } = getConfig();

  const theme = useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiAccordion: {
            root: {
              "&:before": {
                display: "none",
              },
              "&$expanded": {
                marginTop: "0",
              },
            },
          },
          MuiAccordionSummary: {
            root: {
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
            },
          },
          MuiLink: {
            root: {
              color: prefersDarkMode ? "white" : "black",
              fontWeight: prefersDarkMode ? "normal" : "bold",
            },
          },
          MuiFilledInput: {
            root: {
              borderRadius: "4px",
            },
            input: {
              paddingTop: "19px",
              paddingBottom: "18px",
            },
          },
          MuiCardHeader: {
            content: {
              maxWidth: "calc(100% - 99px)",
            },
            title: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
          MuiTooltip: {
            tooltipPlacementBottom: {
              margin: "6px 0",
            },
            tooltip: {
              fontSize: pxToRem(12),
            },
          },
          MuiAppBar: {
            root: {
              boxShadow: "none",
            },
            positionStatic: {
              margin: "2em 0",
            },
          },
          MuiToolbar: {
            regular: {
              "@media (min-width:750px)": {
                minHeight: "48px",
              },
            },
          },
        },
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          background: {
            paper: prefersDarkMode ? grey[800] : grey[100],
            default: prefersDarkMode ? grey[900] : grey[50],
          },
          primary: {
            main: "#43B581",
          },
          secondary: {
            main: "#FCC21B",
          },
        },
        typography: {
          body2: {
            color: prefersDarkMode ? "#CCC" : "rgba(0, 0, 0, 0.85)",
          },
          h5: {
            margin: "2rem 0",
            fontWeight: "bold",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 750,
            md: 1100,
            lg: 1280,
            xl: 1920,
          },
        },
      }),
    [prefersDarkMode, prefersHour12]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md">
          <Header handleOpen={toggleSettingsOpen} />
        </Container>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/changes">
            <Changepage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <SettingsDialog
          open={settingsOpen}
          onClose={toggleSettingsOpen}
          handleReload={handleReload}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
