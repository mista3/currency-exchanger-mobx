import { makeAutoObservable, onBecomeObserved, reaction } from "mobx";
import ky from "ky";
import { mock } from './mock';
import { Language, Status } from './types';

class Store {
  private _base = "USD";
  private _amountInput = '1';
  private _filter: string[] = [];
  private _exchanged: { code: string, value: number }[] = [];
  private _showFiltered = false;
  private _status: Status = "pending";
  private _isDarkMode = true;
  private _lang: Language = 'EN';
  
  constructor() {
    makeAutoObservable(this);
    onBecomeObserved(this, "exchanged", () => {
      const storedBase = localStorage.getItem('base');
      const storedAmount = localStorage.getItem('amount');
      const storedFilter = localStorage.getItem('filter');
      const storedLang = localStorage.getItem('lang');
      if (storedBase) this._base = storedBase;
      if (storedAmount) this._amountInput = storedAmount;
      if (storedFilter) this._filter = JSON.parse(storedFilter);
      if (storedLang) this._lang = storedLang as Language;
      this.fetchCurrencies();
    });
    reaction(
      () => this._base,
      () => this.fetchCurrencies(),
    );
  }

  setBase(value: string) {
    this._base = value;
    localStorage.setItem('base', value);
  }
  get base(){
    return this._base;
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
    localStorage.setItem('amount', this._amountInput);
  }
  get amountInput() {
    return this._amountInput;
  }
  get amount() {
    const number = +this._amountInput;
    if (number === 0) return 1;
    if (number > 1000000) return 1000000;
    if (number < 0.000001) return 0.000001;
    return number;
  }

  get filter() {
    return this._filter;
  }
  setFilter(value: string[]) {
    this._filter = value;
    localStorage.setItem('currencies', JSON.stringify(value));
    if (value.length) {
      this.setShowFiltered(true);
    } else {
      this.setShowFiltered(false);
    }
  }

  async fetchCurrencies() {
    // if (import.meta.env.VITE_MOCK) { 
    if (false) { 
      this._exchanged = mock;
      this._status = "done";
    } else {
      this._exchanged = [];
      this._status = "pending";
      try {
        const res = await ky.get(`${import.meta.env.PROD?'https://mistominapi.ru':'http://localhost:3001'}/currencyexchanger/currencies?base=${this._base}`)      
        const json = await res.json<{ code: string, value: number }[]>();
        this._exchanged = json;
        this._status = "done";
      } catch {
        this._status = "error";
      }
    }
  }
  get exchanged() {
    return this._exchanged;
  }
  get currencyCodes() {
    return this._exchanged.map(({ code }) => code);
  }
  
  setShowFiltered(value: boolean) {
    this._showFiltered = value;
  }
  get showFiltered() {
    return this._showFiltered;
  }
  
  setStatus(value: Status) {
    this._status = value;
  }
  get status(){
    return this._status;
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
  get isDarkMode() {
    return this._isDarkMode;
  }

  toggleLanguage() {
    this._lang = this._lang === 'EN' ? 'RU' : 'EN';
    localStorage.setItem('lang', this._lang);
  }
  get lang() {
    return this._lang;
  }
}

export const store = new Store();