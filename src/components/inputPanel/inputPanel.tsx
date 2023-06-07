import { observer } from "mobx-react-lite";
import { Autocomplete, TextField, Stack, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Box } from "@mui/system";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { store } from "../../store";

import s from "./inputPanel.module.scss";
import { l } from '../../language';

export const InputPanel = observer(({ theme }: { theme: Theme }) => {

  return (
    <div
      className={s.input_panel}
      style={{ padding: theme.spacing(1) }}
    >
      <Stack
        direction="row"
        className={s.first}
        sx={{ marginBottom: theme.spacing(2) }}
      >
        <Stack direction="row" className={s.button_label}>
          <Button
            title="Switch Theme"
            onClick={() => store.toggleMode()}
            color="secondary"
            variant="contained"
            sx={{ margin: theme.spacing(1), height: 56 }}
          >
            {store.isDarkMode ? (
              <LightModeRoundedIcon fontSize="large" />
            ) : (
              <DarkModeRoundedIcon fontSize="large" />
            )}
          </Button>
          <Button
            title="Switch Theme"
            onClick={() => store.toggleLanguage()}
            color="secondary"
            variant="contained"
            sx={{ margin: theme.spacing(1), height: 56 }}
          >
            {store.lang}
          </Button>

          <h1>Currency Exchanger</h1>
        </Stack>

        <Stack direction="row">
          <Autocomplete
            value={store.base}
            onChange={(_, value) => store.setBase(value)}
            autoComplete
            disableClearable
            disablePortal
            id="combo-box-demo"
            options={store.currencyCodes}
            classes={{
              listbox: `${
                store.isDarkMode ? "dark" : "light"
              }-scrollbar`,
            }}
            sx={{ minWidth: 110, color: "primary", margin: theme.spacing(1) }}
            renderGroup={(params) => (
              <Box
                {...params}
                className={`${
                  store.isDarkMode ? "dark" : "light"
                }-scrollbar`}
              />
            )}
            renderInput={(params) => (
              <TextField {...params} label={l[store.lang].base} color="error" />
            )}
          />

          <TextField
            color="error"
            type="number"
            label={l[store.lang].amount}
            value={store.amountInput}
            onWheel={(e) => {
              if (e.target instanceof HTMLElement) e.target.blur();
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={(e) => store.setAmountInput(e.target.value)}
            sx={{ margin: theme.spacing(1), minWidth: "100px" }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" className={s.second}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => store.fetchCurrencies()}
          title="Reload"
          sx={{ marginInline: theme.spacing(1), marginTop: theme.spacing(1), height: 56 }}
        >
          <ReplayRoundedIcon fontSize="large" />
        </Button>
        <Autocomplete
          disableCloseOnSelect
          autoComplete
          multiple
          id="tags-outlined"
          options={store.currencyCodes}
          value={store.filter}
          filterSelectedOptions
          classes={{
            listbox: `${store.isDarkMode ? "dark" : "light"}-scrollbar`,
          }}
          sx={{ width: "100%", margin: theme.spacing(1) }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={l[store.lang].filter}
              color="error"
            />
          )}
          onChange={(_, value) => store.setFilter(value)}
        />

        <Button
          color="secondary"
          variant="contained"
          onClick={() => store.setShowFiltered(true)}
          title="Apply Filter"
          sx={{ marginInline: theme.spacing(1), marginTop: theme.spacing(1), height: 56 }}
        >
          <DoneRoundedIcon fontSize="large" />
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => store.setShowFiltered(false)}
          title="Clear Filter"
          sx={{ marginInline: theme.spacing(1), marginTop: theme.spacing(1), height: 56 }}
        >
          <ClearAllRoundedIcon fontSize="large" />
        </Button>
      </Stack>
    </div>
  );
});
