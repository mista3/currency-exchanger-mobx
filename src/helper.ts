import ratesMock from "./data/ratesMock.json";

export const wait = async(ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

export const getRatesMock = async (base: string) => {
  await wait(1000);
  const rates:Record<string, number> = Object.assign({}, ratesMock.rates);
  const baseValue = rates[base];
  delete rates[base];
  return Object.entries(rates)
    .map(([code, value]) => ({ code, value: value / baseValue }));
}