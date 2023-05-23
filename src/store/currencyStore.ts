import { makeAutoObservable } from "mobx";
import ky from "ky";

class CurrencyStore {
  private _amountInput = '1';
  private _status = "pending";
  private _currencyFilter: string[] = [];
  private _exchangedCurrencies: { code: string, value: number }[] = [];
  private _isDarkMode = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAmountInput(value: string) {
    if (+value < 0) {
      this._amountInput = `${-value}`;
      return;
    }
    if (+value) {
      this._amountInput = `${+value}`;
      return;
    }
    this._amountInput = `${value}`;
  }

  setCurrencyFilter(currencyFilter: string[]) {
    this._currencyFilter = currencyFilter;
  }

  toggleMode() {
    this._isDarkMode = !this._isDarkMode;
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.setAttribute(
        "href",
        this._isDarkMode ?
          "favicon-dark.svg" :
          "favicon-light.svg"
      ); 
    }
  }

  async fetchCurrencies(baseCode: string) {
    this._exchangedCurrencies = [];
    this._status = "pending";
    try {
      const res = await ky.get(`${import.meta.env.PROD?'https://mistominapi.ru':'http://localhost:3001'}/currencyexchanger/currencies?base=${baseCode}`)      
      const json = await res.json<{ code: string, value: number }[]>();
      this._exchangedCurrencies = json;
      this._status = "done";
    } catch {
      this._status = "error";
    }
  }

  get amount() {
    const number = +this._amountInput;
    if (number === 0) return 1;
    if (number > 1000000) return 1000000;
    if (number < 0.000001) return 0.000001;
    return number;
  }

  get amountInput(){
    return this._amountInput;
  }

  get status(){
    return this._status;
  }

  get currencyFilter(){
    return this._currencyFilter;
  }

  get exchangedCurrencies(){
    return this._exchangedCurrencies;
  }

  get isDarkMode(){
    return this._isDarkMode;
  }
}

export const currencyStore = new CurrencyStore();
