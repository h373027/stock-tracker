export interface SentimentData {
  symbol: string,
  data: MonthlySentimentData[]
}

export interface MonthlySentimentData {
  month: string,
  change: number,
  mspr: number
}
