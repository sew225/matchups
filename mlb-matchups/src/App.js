import React from "react";
import { Container, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Matchups from "./componenets/Matchups";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h3" gutterBottom align="center" color="primary">
          MLB Games Today
        </Typography>
        <Matchups />
      </Container>
    </ThemeProvider>
  );
}

export default App;
