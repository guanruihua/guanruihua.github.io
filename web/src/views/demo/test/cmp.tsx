import React, { useEffect, useRef, useState } from 'react'
import { Icon, IconSprites } from './icon'
import type {
  Status,
  StockPrice,
  StockWidgetErrorProps,
  StockWidgetGraphProps,
  StockWidgetProps,
} from './type'

function StockWidget({ symbol, name }: StockWidgetProps) {
  const [fetching, setFetching] = useState(false)
  const [status, setStatus] = useState<Status>('loading')
  const [data, setData] = useState<StockPrice[]>([])
  const LOCALE = 'en-US'
  const CURRENCY = 'USD'
  const currencyFormat = new Intl.NumberFormat(LOCALE, {
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'compact',
  })
  const percentFormat = new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: 2,
    style: 'percent',
  })
  const prices = data.map((price) => price.value)
  while (prices.length < 2) {
    // force a minimum of two values
    prices.unshift(0)
  }
  const lastTwo = prices.slice(-2)
  const difference = lastTwo.reduce((a, b) => b - a)
  const ratio = lastTwo.reduce((a, b) => b / a)
  const change = ratio === Infinity ? 1 : isNaN(ratio) ? 0 : ratio - 1
  const isDown = difference < 0
  // formatted values
  const changeAsSymbol = isDown ? '-' : '+'
  const changeAsWord = isDown ? 'down' : 'up'
  const priceAbs = currencyFormat.format(Math.abs(difference))
  const changeAbs = percentFormat.format(Math.abs(change))
  const visibleLabel = `${changeAsSymbol}${priceAbs} (${changeAsSymbol}${changeAbs})`
  const ariaLabel = `${changeAsWord} ${priceAbs} points (${changeAbs})`
  const mostRecentPrice = currencyFormat.format(lastTwo.slice(-1)[0])

  useEffect(() => {
    // prevent multiple requests for the same data
    setFetching(true)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        // first allow the placeholder to be seen
        await new Promise((res) => setTimeout(res, 1e3))
        // then do the request
        const func = 'TIME_SERIES_DAILY'
        const apiKey = 'demo' // EFPI1W0IT64YLBB4
        const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=${apiKey}`
        const response = await fetch(url)

        if (response.ok) {
          // parameters to get from JSON
          const seriesKey = 'Time Series (Daily)'
          const valueKey = '4. close'
          const dayRange = 14
          const offset = 0
          // get the JSON
          const result = await response.json()
          const daily = result[seriesKey]
          // use data from the last n days
          const dates = Object.keys(daily).slice(offset, dayRange + offset)
          const dataArray: StockPrice[] = []
          // build the data array
          dates.forEach((date) => {
            dataArray.unshift({
              date: new Date(date),
              value: +daily[date][valueKey],
            })
          })
          setData(dataArray)
          setStatus('ok')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    }
    if (fetching) fetchData()
  }, [fetching])

  const statusMap = {
    error: <StockWidgetError symbol={symbol} />,
    loading: <StockWidgetPlaceholder />,
    ok: (
      <>
        <StockWidgetGraph data={prices} />
        <div className="widget__content">
          <h2 className="widget__symbol">{symbol}</h2>
          <h3 className="widget__name">{name}</h3>
          <div
            className={`widget__change ${
              isDown ? 'widget__change--negative' : 'widget__change--positive'
            }`}
            aria-label={ariaLabel}
          >
            {data.length ? (
              <>
                <Icon icon={changeAsWord} />
                {visibleLabel}
              </>
            ) : (
              '-'
            )}
          </div>
          <div className="widget__price">
            {data.length ? mostRecentPrice : '-'}
          </div>
        </div>
      </>
    ),
  }
  console.log(data)
  return <div className="widget">{statusMap[status]}</div>
}
function StockWidgetError({ symbol }: StockWidgetErrorProps) {
  return (
    <div className="widget__content">
      <div className="widget__error">
        <Icon icon="warning" color="warning" size="large" />
        <p>
          Couldn’t get data for <strong>{symbol}</strong>. Try again later.
        </p>
      </div>
    </div>
  )
}
function StockWidgetGraph({ data }: StockWidgetGraphProps) {
  const [animated, setAnimated] = useState(false)
  const animationRef = useRef(0)
  const lowestPrice = data.reduce((a, b) => (b < a ? b : a))
  const highestPrice = data.reduce((a, b) => (b > a ? b : a))
  const difference = highestPrice - lowestPrice
  const graphWidth = 105
  const graphHeight = 90
  const graphPoints = data.map((n, i) => {
    const x = graphWidth * (i / (data.length - 1))
    let y = (1 - (n - lowestPrice) / difference) * graphHeight

    if (isNaN(y)) {
      y = graphHeight
    }

    return [+x.toFixed(2), +y.toFixed(2)]
  })
  const graphPointsDrawn = [
    [-1, graphHeight],
    ...graphPoints,
    [graphWidth + 1, graphHeight],
  ]
  const graphPointsToString = graphPointsDrawn
    .map((point) => point.join(' '))
    .join(',')
  const graphClipStyle = {
    transform: `translate(${-graphWidth}px,0)`,
  }
  const clipID = `line-clip-${randomHash()}`

  useEffect(() => {
    // allow the animation to run on mount
    animationRef.current = setTimeout(() => setAnimated(true), 400)
  }, [])

  return (
    <svg
      className="widget__graph"
      viewBox={`0 0 ${graphWidth} ${graphHeight}`}
      width={`${graphWidth}px`}
      height={`${graphHeight}px`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipID}>
          <rect
            className="widget__graph-clip"
            width={graphWidth}
            height={graphHeight}
            style={!animated ? graphClipStyle : {}}
          />
        </clipPath>
      </defs>
      <polyline
        className="widget__graph-line"
        clipPath={`url(#${clipID})`}
        strokeWidth="1"
        points={graphPointsToString}
      />
    </svg>
  )
}
function StockWidgetPlaceholder() {
  return (
    <div className="widget__content">
      <div className="widget__placeholder widget__placeholder--symbol"></div>
      <div className="widget__placeholder widget__placeholder--name"></div>
      <div className="widget__placeholder widget__placeholder--change"></div>
      <div className="widget__placeholder widget__placeholder--price"></div>
    </div>
  )
}
function randomHash() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
  return Math.round(0xffff * random).toString(16)
}

export function Cmp() {
  return (
    <div>
      <IconSprites />
      <div className="widget-grid">
        <StockWidget symbol="MSFT" name="Microsoft Corporation" />
        <StockWidget symbol="IBM" name="IBM" />
      </div>
    </div>
  )
}
