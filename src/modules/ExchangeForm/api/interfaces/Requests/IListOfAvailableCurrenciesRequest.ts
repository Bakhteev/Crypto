import { type FlowTypes } from '@/modules/ExchangeForm/api/enums'

export interface IListOfAvailableCurrenciesRequest {
  active?: boolean
  flow?: FlowTypes
  buy?: boolean
  sell?: boolean
}
