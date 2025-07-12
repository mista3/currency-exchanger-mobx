import { makeAutoObservable } from "mobx";
import { getRatesMock } from "../helper";

class CurrencyStore {
  amount = 1;
  status = "pending";
  currencyFilter: string[] = [];
  exchangedCurrencies: { code: string, value: number }[] = [];
  isDarkMode = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  setCurrencyFilter(currencyFilter: string[]) {
    this.currencyFilter = currencyFilter;
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.setAttribute(
        "href",
        this.isDarkMode ?
          "favicon-dark.svg" :
          "favicon-light.svg"
      ); 
    }
  }

  async fetchCurrencies(baseCode: string) {
    this.exchangedCurrencies = [];
    this.status = "pending";
    try {
      this.exchangedCurrencies = await getRatesMock(baseCode);
      this.status = "done";
    } catch {
      this.status = "error";
    }
  }
}

export const currencyStore = new CurrencyStore();
