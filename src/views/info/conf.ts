interface CONF {
  coreStock: {
    function: string
    fields: string[]
    list: {
      symbol: string
      name: string
    }[]
  }
  FX: {
    function: string
    list: {
      name: string
      from_currency: string
      to_currency: string
    }[]
  }
}

export const Conf: CONF = {
  coreStock: {
    function: 'REALTIME_BULK_QUOTES',
    fields: ['symbol', 'name', 'change', 'close', 'timestamp'],
    list: [
      {
        symbol: 'IBM',
        name: 'IBM',
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
      },
      {
        symbol: 'AAPL',
        name: 'AAPL',
      },
    ],
  },
  FX: {
    function: 'CURRENCY_EXCHANGE_RATE',
    list: [
      {
        name: 'Chinese Yuan Offshore',
        from_currency: 'USD',
        to_currency: 'CNY',
      },
      {
        name: 'Chinese Yuan',
        from_currency: 'USD',
        to_currency: 'CNH',
      },
    ],
  },
}
