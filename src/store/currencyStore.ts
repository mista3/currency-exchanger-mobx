import { makeAutoObservable } from "mobx";
import ky from "ky";

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
  }

  async fetchCurrencies(baseCode: string) {
    this.exchangedCurrencies = [];
    this.status = "pending";
    try {
      const res = await ky.get(`https://api.currencyapi.com/v3/latest?apikey=56f8e570-2e43-11ec-bfde-632279073c09&base_currency=${baseCode}`)      
      const json = await res.json<{ data: { [key: string]: { code:string, value: number}}}>();
      this.exchangedCurrencies = Object.values(json.data);
      this.status = "done";
    } catch {
      this.status = "error";
    }
  }
}

export const currencyStore = new CurrencyStore();
