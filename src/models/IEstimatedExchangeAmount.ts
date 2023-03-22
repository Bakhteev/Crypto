export interface IEstimatedExchangeAmount {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  flow: string
  type: string
  rateId: string
  validUntil: string
  transactionSpeedForecast: any
  warningMessage: any
  fromAmount: number
  toAmount: number
}
