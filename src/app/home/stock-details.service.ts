import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {QuoteData} from './quote-data';

interface SymbolLookupResponse {
  // Number of results
  count: number,
  // Array of search results
  result: CompanyResponse[]
}

interface CompanyResponse {
  // Symbol description
  description: string,
  // Display symbol name
  displaySymbol: string,
  // Unique symbol used to identify this symbol used in /stock/candle endpoint
  symbol: string,
  // Security type
  type: string
}

interface QuoteResponse {
  // Current price
  c: number,
  // Change
  d: number,
  // Percent change
  dp: number,
  // High price of the day
  h: number,
  // Low price of the day
  l: number,
  // Open price of the day
  o: number,
  // Previous close price
  pc: number,
  // Timestamp
  t: number
}


@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {

  baseUrl = 'https://finnhub.io/api/v1/';
  apiKey = 'bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) {
  }

  private getCompanyData(symbol: string): Observable<SymbolLookupResponse> {
    const url = this.baseUrl + 'search';
    const params = new HttpParams()
      .set('q', symbol)
      .set('token', this.apiKey);
    return this.http.get<SymbolLookupResponse>(url, {params});
  }

  private getQuoteData(symbol: string): Observable<QuoteResponse> {
    const url = this.baseUrl + 'quote';
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('token', this.apiKey);
    return this.http.get<QuoteResponse>(url, {params});
  }

  convertQuoteData(symbol: string, response: QuoteResponse): QuoteData {
    return {
      symbol: symbol,
      currentPrice: response.c,
      percentChange: response.dp,
      openingPriceOfTheDay: response.o,
      highPriceOfTheDay: response.h
    } as QuoteData;
  }

  getCompanyName(symbol: string): Observable<string> {
    return this.getCompanyData(symbol)
      .pipe(map(companyData => companyData.result[0]?.description));
  }

  getQuoteDataModel(symbol: string): Observable<QuoteData> {
    return this.getQuoteData(symbol)
      .pipe(map(quoteData => this.convertQuoteData(symbol, quoteData)));
  }
}
