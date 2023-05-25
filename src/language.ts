import { Language } from './types';

export const l: {[lang in Language]: {[key:string]: string}} = {
  RU: {
    filter: 'Фильтр',
    base: 'Валюта',
    amount: 'Сумма',
  },
  EN: {
    filter: 'Filter',
    base: 'Base',
    amount: 'Amount',
  }
}