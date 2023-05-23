import "./inputPanel.scss";
import { useEffect, useState } from "react";
import currencyCodes from "../../data/currencyCodes.json";
import { Autocomplete, TextField, Stack, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Box } from "@mui/system";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { currencyStore } from "../../store/currencyStore";
import { observer } from "mobx-react-lite";

const InputPanel = observer(({ theme }: { theme: Theme }) => {
  const [baseCurrency, setBaseCurrency] = useState(() => {
    return "USD";
  });

  const [filter, setFilter] = useState(() => {
    return Array<string>();
  });

  const currencyCodesWithoutBase = currencyCodes.filter((code) => {
    return code != baseCurrency;
  });

  useEffect(() => {
    currencyStore.fetchCurrencies(baseCurrency);
    currencyStore.setCurrencyFilter(currencyCodesWithoutBase);
  }, []);

  return (
    <div
      className="inputPanel"
      style={{ padding: theme.spacing(1), width: "100%" }}
    >
      <Stack
        direction="row"
        className="first"
        sx={{ marginBottom: theme.spacing(2) }}
      >
        <Stack direction="row" className="buttonLabel">
          <Button
            title="Switch Theme"
            onClick={() => currencyStore.toggleMode()}
            color="secondary"
            variant="contained"
            sx={{ margin: theme.spacing(1) }}
          >
            {currencyStore.isDarkMode ? (
              <LightModeRoundedIcon fontSize="large" />
            ) : (
              <DarkModeRoundedIcon fontSize="large" />
            )}
          </Button>

          <h1>Currency Exchanger</h1>
        </Stack>

        <Stack direction="row">
          <Autocomplete
            onChange={(_, value) => {
              currencyStore.fetchCurrencies(value);
              setBaseCurrency(value);
            }}
            autoComplete
            disableClearable
            disablePortal
            defaultValue={baseCurrency}
            id="combo-box-demo"
            options={currencyCodes}
            classes={{
              listbox: `${
                currencyStore.isDarkMode ? "dark" : "light"
              }-scrollbar`,
            }}
            sx={{ minWidth: 110, color: "primary", margin: theme.spacing(1) }}
            renderGroup={(params) => (
              <Box
                {...params}
                className={`${
                  currencyStore.isDarkMode ? "dark" : "light"
                }-scrollbar`}
              />
            )}
            renderInput={(params) => (
              <TextField {...params} label="Base Currency" color="error" />
            )}
          />

          <TextField
            color="error"
            type="number"
            label="Amount"
            value={currencyStore.amountInput}
            onWheel={(e) => {
              if (e.target instanceof HTMLElement) e.target.blur();
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={(e) => currencyStore.setAmountInput(e.target.value)}
            sx={{ margin: theme.spacing(1), minWidth: "100px" }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" className="second">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => currencyStore.fetchCurrencies(baseCurrency)}
          title="Reload"
          sx={{ margin: theme.spacing(1) }}
        >
          <ReplayRoundedIcon fontSize="large" />
        </Button>
        <Autocomplete
          disableCloseOnSelect
          autoComplete
          multiple
          id="tags-outlined"
          options={currencyCodesWithoutBase}
          filterSelectedOptions
          classes={{
            listbox: `${currencyStore.isDarkMode ? "dark" : "light"}-scrollbar`,
          }}
          sx={{ width: "100%", margin: theme.spacing(1) }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Currencies to convert to"
              color="error"
            />
          )}
          onChange={(_, value) => {
            setFilter(value);
            currencyStore.setCurrencyFilter(
              value.length ? value : currencyCodesWithoutBase
            );
          }}
        />

        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            filter.length && currencyStore.setCurrencyFilter(filter);
          }}
          title="Apply Filter"
          sx={{ margin: theme.spacing(1) }}
        >
          <DoneRoundedIcon fontSize="large" />
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => currencyStore.setCurrencyFilter(currencyCodes)}
          title="Clear Filter"
          sx={{ margin: theme.spacing(1) }}
        >
          <ClearAllRoundedIcon fontSize="large" />
        </Button>
      </Stack>
    </div>
  );
});

export default InputPanel;
