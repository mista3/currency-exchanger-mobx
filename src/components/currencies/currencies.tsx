import { LinearProgress, Typography, Box, Paper } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
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
        .filter(({code}) => {
          return currencyStore.currencyFilter.includes(code);
        })
        .map(({code, value}) => {
          return (
            <Paper
              key={code}
              sx={{
                backgroundColor: theme.palette.primary.light,
                margin: theme.spacing(1),
                flex: "1 1",
                padding: theme.spacing(2),
              }}
            >
              <Typography sx={{ fontSize: 40 }}>
                {Math.round(value * currencyStore.amount*1000)/1000}
              </Typography>
              <Typography sx={{ fontSize: 20 }}>{code}</Typography>
            </Paper>
          );
        })}
    </div>
  </div>
));

export default Currencies;
