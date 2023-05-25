import { LinearProgress, Typography, Box, Paper, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Theme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { store } from "../../store";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

export const Currencies = observer(({ theme }: { theme: Theme }) => (
  <div>
    {(store.status == "pending" && (
      <Box sx={{ width: "100%", paddingInline: theme.spacing(2) }}>
        <LinearProgress
          color="secondary"
          sx={{ borderRadius: "10px", height: "5px" }}
        />
      </Box>
    )) ||
      (store.status == "error" && (
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize: 20 }} color="error" align="center">
            Unable to load data. Please wait a moment and try again.
          </Typography>
        </Box>
      ))}
    <div style={{ padding: theme.spacing(1), display: "flex", flexWrap: "wrap", marginBottom: 64 }}>
      {store.exchanged
        .filter(({ code }) =>
          !store.filter.length ||
          !store.showFiltered ||
          store.filter.includes(code)
        )
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
              <LightTooltip title={value} placement='top' arrow>
              <Typography sx={{ fontSize: 40 }}>
                {Math.round(value * store.amount * 100) / 100}
              </Typography>
              </LightTooltip>
              <Typography sx={{ fontSize: 20 }}>{code}</Typography>
            </Paper>
          );
        })}
    </div>
  </div>
));
