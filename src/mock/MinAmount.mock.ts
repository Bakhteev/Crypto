import { type IMinimalExchangeAmount } from '@/models'

export const MinimalExchangeAmountMock: IMinimalExchangeAmount = {
  fromCurrency: 'btc',
  fromNetwork: 'btc',
  toCurrency: 'usdt',
  toNetwork: 'eth',
  flow: 'standard',
  minAmount: 0.0002787
}
