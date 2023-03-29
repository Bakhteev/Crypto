import { type FlowTypes } from '@/modules/ExchangeForm/api/enums'

export interface IMinimalExchangeAmountRequest {
  fromCurrency: string
  toCurrency: string
  fromNetwork?: string
  toNetwork?: string
  flow?: FlowTypes
}
