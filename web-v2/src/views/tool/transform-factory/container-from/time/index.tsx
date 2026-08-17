import React from 'react'
import { Button, DatePicker } from 'antd'
import './index.less'
import { copy } from '@/util'
import { Icon } from '@/components'
import dayjs from 'dayjs'
import { DayjsFormatInput } from './dayjs-format-input'
import { Dayjs } from 'dayjs'

export default function ContainerFromTime() {
  const [_now, setNow] = React.useState<Dayjs>(dayjs())
  const [inputTime, setInputTime] = React.useState<Dayjs>(null)
  const now = inputTime || _now
  const date = now.toDate()
  const timer = React.useRef<NodeJS.Timeout | null>(null)

  const run = () => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setNow(dayjs())
      run()
    }, 500)
  }
  React.useEffect(() => {
    run()
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  const [dayjsFormat, setDayjsFormat] = React.useState('YYYY-MM-DD HH:mm:ss')
  const dayjs_format_val = now.format(dayjsFormat)

  const items = [
    {
      label: 'JS locale date string',
      value: 'js-locale-data',
      get: () => date.toLocaleDateString(),
    },
    // { label: 'ISO 8601', value: 'iso-8601', get: () => date.toISOString() },
    // {
    //   label: 'ISO 9075',
    //   value: 'iso-9075',
    //   get: () => {
    //     return 1
    //   },
    // },
    // { label: 'RFC 3339', value: 'rfc-3339', get: () => '' },
    // { label: 'RFC 7231', value: 'rfc-7231', get: () => '' },
    {
      label: 'Unix Timestamp (10) / 秒级',
      value: 'unix-timestamp',
      get: () => date.getTime().toString().slice(0, 10),
    },
    {
      label: 'Timestamp (13) / 毫秒',
      value: 'timestamp',
      get: () => date.getTime(),
    },
    // { label: 'UTC format', value: 'utc-format', get: () => '' },
    // { label: 'Mongo ObjectID', value: 'mongo-objectid', get: () => '' },
    {
      label: 'Excel date / time',
      value: 'excel-time',
      get: () => {
        const excelEpoch = new Date(1899, 11, 31) // 1899-12-31 00:00:00 本地时间
        return ((date.getTime() - excelEpoch.getTime()) / 86400000).toFixed(8)
      },
    },
  ]

  return (
    <div className="container-from__time">
      <div className="container-from__time-container">
        <div className="item">
          <div className="label">Time Select</div>
          <DatePicker
            value={inputTime}
            showTime
            style={{ width: 220 }}
            onChange={(val) => {
              console.log(val)
              if (val) {
                setInputTime(val)
                timer.current && clearTimeout(timer.current)
              } else {
                setInputTime(null)
                run()
              }
            }}
          />
        </div>
        <div className="item" key={'dayjs'}>
          <div className="label">dayjs / format</div>
          <div className="value-box">
            <div className="value">{dayjs_format_val}</div>
            <Button
              type="link"
              icon={<Icon type="copy" />}
              onClick={() => copy(dayjs_format_val)}
            />
            <DayjsFormatInput value={dayjsFormat} setValue={setDayjsFormat} />
          </div>
        </div>
        {items.map((item) => {
          const { label, get } = item
          const value_txt = get()
          return (
            <div className="item" key={label}>
              <div className="label">{label}</div>
              <div className="value-box">
                <div className="value">{value_txt}</div>
                <Button
                  type="link"
                  icon={<Icon type="copy" />}
                  onClick={() => copy(value_txt)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
