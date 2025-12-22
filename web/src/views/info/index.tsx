import React from 'react'
import { request } from './service'
import { ObjectType } from '0type'
import { Icon, IconSprites } from './icon'
import { Conf } from './conf'
import './index.less'
// import { stringify } from 'abandonjs'

const getConf = (symbol: string): any =>
  Conf.coreStock.list.find((_) => _.symbol === symbol) || {}

export default function Info() {
  const [coreStock, setCoreStock] = React.useState<ObjectType[]>([])
  // const [FX_ExchangeRates, setFX_ExchangeRates] = React.useState<ObjectType>({})

  const init = async () => {
    request({
      defaultValue: [],
      params: {
        function: Conf.coreStock.function,
        symbol: Conf.coreStock.list.map((_) => _.symbol).join(','),
      },
    }).then(res=>setCoreStock(res.data))

    // const newFX_ExchangeRates: ObjectType = {}
    // for (let i = 0; i < Conf.FX.list.length; i++) {
    //   const { name, from_currency, to_currency } = Conf.FX.list[i]
    //   const res = await request({
    //     params: {
    //       function: Conf.FX.function,
    //       from_currency,
    //       to_currency,
    //     },
    //   })
    //   console.log(name, res)
    //   newFX_ExchangeRates[name] = res?.['Realtime Currency Exchange Rate'] || {}
    // }
    // setFX_ExchangeRates(newFX_ExchangeRates)
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <div className="info-page">
      <IconSprites />
      <div className="core-stock module">
        <h3>核心股票</h3>
        <div className="content">
          {coreStock?.map((item: any, i: number) => {
            const { symbol } = item
            const { name } = getConf(symbol)
            const record = { name, ...item }

            return (
              <div key={i} className="card">
                {Conf.coreStock.fields.map((key, j) => {
                  if (key === 'change') {
                    const val = record[key] || 0
                    const status = val < 0 ? 'down' : 'up'
                    return (
                      <div className={`field ${key} ${status}`} key={j}>
                        <Icon icon={status} />
                        {val}
                      </div>
                    )
                  }
                  return (
                    <div className={'field ' + key} key={j}>
                      {record[key]}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className="FX module">
        <h3>外汇</h3>
        <div className="content">
          <div className="card">
            {stringify(FX_ExchangeRates)}
          </div>
        </div>
      </div> */}
    </div>
  )
}
