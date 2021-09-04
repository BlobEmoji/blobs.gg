import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Homepage from "./pages/homepage";
import { getDefaultHourFormat, getKeyWrapper } from "./utils";
import Changepage from "./pages/changepage";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import grey from "@mui/material/colors/grey";
import useMediaQuery from "@mui/material/useMediaQuery";
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
      createTheme({
        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                "&:before": {
                  display: "none",
                },
                "&$expanded": {
                  marginTop: "0",
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              },
            },
          },
          MuiLink: {
            defaultProps: {
              underline: "hover",
            },
            styleOverrides: {
              root: {
                color: prefersDarkMode ? "white" : "black",
                fontWeight: prefersDarkMode ? "normal" : "bold",
              },
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                borderRadius: "4px",
              },
              input: {
                paddingTop: "19px",
                paddingBottom: "18px",
              },
            },
          },
          MuiCardHeader: {
            styleOverrides: {
              content: {
                maxWidth: "calc(100% - 99px)",
              },
              title: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltipPlacementBottom: {
                margin: "6px 0",
              },
              tooltip: {
                fontSize: pxToRem(12),
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                backgroundColor: "transparent",
                backgroundImage: "none",
              },
              positionStatic: {
                margin: "2em 0",
              },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              regular: {
                "@media (min-width:750px)": {
                  minHeight: "48px",
                },
              },
            },
          },
        },
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
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
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [prefersDarkMode, prefersHour12]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Container maxWidth="md">
            <Header handleOpen={toggleSettingsOpen} />
          </Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/changes" element={<Changepage />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
          <SettingsDialog
            open={settingsOpen}
            onClose={toggleSettingsOpen}
            handleReload={handleReload}
          />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
