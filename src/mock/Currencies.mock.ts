import { type ICurrency } from '@/models/ICurrency'

export const CurrenciesMock: ICurrency[] = [
  {
    ticker: 'btc',
    name: 'Bitcoin',
    image: 'https://changenow.io/images/sprite/currencies/btc.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
    network: 'btc',
    tokenContract: null,
    buy: true,
    sell: true
  },
  {
    ticker: 'eth',
    name: 'Ethereum',
    image: 'https://changenow.io/images/sprite/currencies/eth.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
    network: 'eth',
    tokenContract: null,
    buy: true,
    sell: true
  },
  {
    ticker: 'usdt',
    name: 'Tether (OMNI)',
    image: 'https://changenow.io/images/sprite/currencies/usdt.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true,
    network: 'btc',
    tokenContract: '31',
    buy: true,
    sell: true
  },
  {
    ticker: 'usdt',
    name: 'Tether (ERC20)',
    image: 'https://changenow.io/images/sprite/currencies/usdterc20.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: true,
    supportsFixedRate: true,
    network: 'eth',
    tokenContract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    buy: true,
    sell: true
  }
]
