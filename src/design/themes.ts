import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
    mode: "dark",

    primary: {
      light: "#4f5b62",
      main: "#263238",
      dark: "#000a12",
    },

    secondary: {
      light: "#f05545",
      main: "#b71c1c",
      dark: "#7f0000",
    },

    error:{
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
    }
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      light: "#ffffff",
      main: "#eceff1",
      dark: "#babdbe",
    },

    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
    },

    error:{
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
    }
  },
});
