import { LinearProgress, Typography, Box, Paper, Theme } from "@mui/material";
import { observer } from "mobx-react";
import { currencyStore } from "../../store/currencyStore";

const Currencies = observer(({ theme }: { theme: Theme }) => (
  <div>
    {(currencyStore.status == "pending" && (
      <Box sx={{ width: "100%", paddingInline: theme.spacing(2) }}>
        <LinearProgress
          color="secondary"
          sx={{ borderRadius: "10px", height: "5px" }}
        />
      </Box>
    )) ||
      (currencyStore.status == "error" && (
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize: 20 }} color="error" align="center">
            Unable to load data. Please wait a moment and try again.
          </Typography>
        </Box>
      ))}
    <div
      className="currencies"
      style={{ padding: theme.spacing(1), display: "flex", flexWrap: "wrap" }}
    >
      {currencyStore.exchangedCurrencies
        .filter((value) => {
          return currencyStore.currencyFilter.includes(value[0]);
        })
        .map((code, index) => {
          return (
            <Paper
              key={index}
              sx={{
                backgroundColor: theme.palette.primary.light,
                margin: theme.spacing(1),
                flex: "1 1",
                padding: theme.spacing(2),
              }}
            >
              <Typography sx={{ fontSize: 40 }}>
                {(code[1] * currencyStore.amount).toFixed(2)}
              </Typography>
              <Typography sx={{ fontSize: 20 }}>{code[0]}</Typography>
            </Paper>
          );
        })}
    </div>
  </div>
));

export default Currencies;
