import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {QuoteData} from '../models/quote-data';
import {MonthlySentimentData, SentimentData} from '../models/sentiment-data';

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

interface SentimentDataResponse {
  // Symbol.
  symbol: string,
  // Year.
  year: number,
  // Month.
  month: number,
  // Net buying/selling from all insiders' transactions.
  change: number,
  // Monthly share purchase ratio.
  mspr: number
}

interface SentimentResponse {
  // Array of sentiment data.
  data: SentimentDataResponse[],
  // Symbol of the company.
  symbol: string
}

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {

  baseUrl = 'https://finnhub.io/api/v1/';
  apiKey = 'bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) {
  }

  getCompanyName(symbol: string): Observable<string> {
    return this.getCompanyData(symbol)
      .pipe(map(companyData => companyData.result[0]?.description));
  }

  getQuoteDataModel(symbol: string): Observable<QuoteData> {
    return this.getQuoteData(symbol)
      .pipe(map(quoteData => this.convertQuoteData(symbol, quoteData)));
  }

  getSentimentData(symbol: string): Observable<SentimentData> {
    return this.getInsiderSentiment(symbol).pipe(map(result => this.convertSentimentData(result)));
  }

  private convertQuoteData(symbol: string, response: QuoteResponse): QuoteData {
    return {
      symbol: symbol,
      currentPrice: response.c,
      percentChange: response.dp,
      openingPriceOfTheDay: response.o,
      highPriceOfTheDay: response.h
    } as QuoteData;
  }

  private convertSentimentData(sentimentResponse: SentimentResponse): SentimentData {
    const data: MonthlySentimentData[] = sentimentResponse.data.map(element => {
      return {
        month: this.monthToString(element.month),
        change: element.change,
        mspr: element.mspr
      }
    });
    return {
      symbol: sentimentResponse.symbol,
      data: data
    };
  }

  private dateToString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private monthToString(month: number): string {
    const today = new Date();
    return new Date(today.setMonth(month)).toLocaleString('default', { month: 'long' });
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

  private getInsiderSentiment(symbol: string): Observable<SentimentResponse> {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 3);

    const url = this.baseUrl + 'stock/insider-sentiment';
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('from', this.dateToString(fromDate))
      .set('to', this.dateToString(toDate))
      .set('token', this.apiKey);
    return this.http.get<SentimentResponse>(url, {params});
  }
}
