import React from 'react'
import { copyText } from 'harpe'
import { useSetState } from '0hook'
import { CopyIcon } from './icon'
import { ObjectType } from '0type'
import { List } from './constant'
import { getNow, getStr } from './util'
import { Input, InputNumber } from './components'
import { Reload } from './icon'
import './index.less'

const defaultValue = {
  num: 1,
  min: 10,
  max: 32,
  number: true,
  letter: true,
  LETTER: true,
  symbol: true,
  include: '',
  exclude: '',
}

export function RandomPwd() {
  const [conf, setConf] = useSetState<ObjectType>(
    defaultValue,
    'LengthString-conf',
  )
  const [time, setTime] = React.useState<number>(0)
  const [flag, setFlag] = React.useState(-1)
  const [num, setNum] = React.useState(1)

  React.useEffect(() => {
    const gap = time - getNow()
    if (time < 1 || gap <= 0) return
    setFlag(1)
    const timer = setTimeout(() => {
      setFlag(-1)
    }, gap)

    return () => {
      setFlag(-1)
      clearTimeout(timer)
    }
  }, [time])

  const RandomString = () => {
    const targetString = getStr(conf)
    return (
      <div className="row">
        <span className="value">{targetString}</span>
        <span className="value len">{`<${targetString.length}>`}</span>
        <span
          className="icon"
          onClick={() => {
            copyText(targetString) && setTime(getNow() + 3000)
          }}
        >
          {CopyIcon}
        </span>
      </div>
    )
  }

  return (
    <div className="panel-gen">
      {flag > 0 && <div className="alert">Copy Success</div>}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10 }}
      >
        <div
          className="col-flex border left"
          style={{
            alignItems: 'flex-start',
            paddingRight: 10,
          }}
        >
          <div className="row-flex">
            <div className="label">使用字符</div>
            <div className="value row-flex">
              {List.map(({ value, label }) => {
                return (
                  <div key={value} className="row-flex">
                    <input
                      type="checkbox"
                      checked={conf[value]}
                      onChange={(e: any) =>
                        setConf({ [value]: e.target.checked ?? false })
                      }
                    />
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="row-flex">
            <div className="label">生成数量</div>
            <InputNumber
              className={'value'}
              value={conf.num}
              onChange={(num: any) => setConf({ num })}
            />
            <div className="label">密码长度</div>
            <div className="value row-flex">
              <InputNumber
                value={conf.min}
                onChange={(min: any) => setConf({ min })}
              />
              <span>-</span>
              <InputNumber
                value={conf.max}
                onChange={(max: any) => setConf({ max })}
              />
            </div>
          </div>
          <div className="row-flex">
            <div className="label">包含字符</div>
            <Input
              className={'value'}
              value={conf.include}
              onChange={(include: any) => setConf({ include })}
            />
          </div>
          <div className="row-flex">
            <div className="label">排除字符</div>
            <Input
              className={'value'}
              value={conf.exclude}
              onChange={(exclude: any) => setConf({ exclude })}
            />
          </div>
          <div>
            <div
              className="reload-btn"
              onClick={() => {
                setNum((n) => n + 1)
              }}
            >
              {Reload}
            </div>
          </div>
        </div>
        <div className="result border">
          {new Array(conf.num).fill('').map((_, i) => (
            <RandomString key={i + '_' + num} />
          ))}
        </div>
      </div>
    </div>
  )
}
