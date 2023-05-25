import { observer } from "mobx-react-lite";
import { Paper, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./design/themes";
import {Currencies, InputPanel} from "./components";
import { store } from "./store";

import "./app.scss";


const App = observer(() => {
  const theme = store.isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Paper
        className={`app ${store.isDarkMode ? "dark" : "light"}-scrollbar`}
        sx={{backgroundColor: theme.palette.primary.main}}
        square
      >
        <InputPanel theme={theme} />
        <Currencies theme={theme} />
      </Paper>
    </ThemeProvider>
  );
});

export default App;