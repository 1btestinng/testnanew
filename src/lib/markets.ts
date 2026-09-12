export type MarketConfig = {
  country: string; countryName: string; currency: string; currencySymbol: string;
  exchangeCode: string; exchangeName: string; timezone: string; suffix?: string;
  fxSymbol: string; marketOpen: string; marketClose: string; tradingDays: number[];
};

export const MARKETS: Record<string, MarketConfig> = {
  EG: {country:'EG',countryName:'Egypt',currency:'EGP',currencySymbol:'E£',exchangeCode:'EGX',exchangeName:'Egyptian Exchange',timezone:'Africa/Cairo',suffix:'.CA',fxSymbol:'EGP=X',marketOpen:'10:00',marketClose:'14:30',tradingDays:[1,2,3,4,7]},
  MA: {country:'MA',countryName:'Morocco',currency:'MAD',currencySymbol:'DH',exchangeCode:'CSE',exchangeName:'Casablanca Stock Exchange',timezone:'Africa/Casablanca',suffix:'.CS',fxSymbol:'MAD=X',marketOpen:'09:00',marketClose:'15:30',tradingDays:[1,2,3,4,5]},
  TN: {country:'TN',countryName:'Tunisia',currency:'TND',currencySymbol:'DT',exchangeCode:'BVMT',exchangeName:'Tunis Stock Exchange',timezone:'Africa/Tunis',suffix:'.TN',fxSymbol:'TND=X',marketOpen:'09:00',marketClose:'14:00',tradingDays:[1,2,3,4,5]},
  DZ: {country:'DZ',countryName:'Algeria',currency:'DZD',currencySymbol:'DA',exchangeCode:'SGBV',exchangeName:'Algiers Stock Exchange',timezone:'Africa/Algiers',fxSymbol:'DZD=X',marketOpen:'09:30',marketClose:'14:30',tradingDays:[1,2,3,4,5]}
};

export function getMarket(country: string): MarketConfig | undefined { return MARKETS[country.toUpperCase()]; }
