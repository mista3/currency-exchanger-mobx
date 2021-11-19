//test
import axios from "axios";
import { action, makeAutoObservable } from "mobx";

class CurrencyStore {
  amount: number = 1;
  status: string = "pending";
  currencyFilter: string[] = [];
  exchangedCurrencies: [string, number][] = [];
  isDarkMode: boolean = true;

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
  }

  fetchCurrencies(baseCode: string) {
    this.exchangedCurrencies = [];
    this.status = "pending";
    axios
      .get<{ query: {}; data: {} }>(
        `https://freecurrencyapi.net/api/v2/latest?apikey=56f8e570-2e43-11ec-bfde-632279073c09&base_currency=${baseCode}`
      )
      .then(
        action((response) => {
          this.exchangedCurrencies = Object.entries(response.data.data);
          this.status = "done";
        }),
        action((error) => {
          this.status = "error";
          console.log(error);
        })
      );
  }
}

export const currencyStore = new CurrencyStore();
