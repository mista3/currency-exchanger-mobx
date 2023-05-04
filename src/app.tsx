import "./app.scss";
import { Paper, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./design/themes";
import Currencies from "./components/currencies/currencies";
import InputPanel from "./components/inputPanel/inputPanel";
import { currencyStore } from "./store/currencyStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const theme = currencyStore.isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: "100vh",
          borderRadius: 0,
        }}
        className={`${
          currencyStore.isDarkMode ? "dark" : "light"
        }-scrollbar app`}
      >
        <InputPanel theme={theme} />
        <Currencies theme={theme} />
      </Paper>
    </ThemeProvider>
  );
});

export default App;