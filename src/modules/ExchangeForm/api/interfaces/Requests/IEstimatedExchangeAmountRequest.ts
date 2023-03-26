import { FlowTypes } from '@/modules/ExchangeForm/api/enums';

export interface IEstimatedExchangeAmountRequest {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number | string; // must be > 0
  toAmount: number | string; // must be > 0
  fromNetwork: string;
  toNetwork: string;
  flow?: FlowTypes;
  type?: string;
  useRateId?: boolean;
}