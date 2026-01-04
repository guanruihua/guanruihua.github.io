import React from 'react'
import { HttpStatusList } from './conf'
import { Flex } from 'aurad'
import './index.less'
import { useSetState } from '0hook'
import { classNames } from 'harpe'

export default function () {
  const [state, setState] = useSetState<{
    select: string[]
  }>(
    {
      select: [],
    },
    'other/http-status|cache',
  )
  return (
    <div className="other-http-status">
      <h2> HTTP Status</h2>
      <Flex className="tags" gap={10} center>
        {HttpStatusList.map((item: any, i) => {
          const { title, code } = item
          return (
            <Flex
              key={i}
              gap={10}
              row
              center
              className={classNames(`tag code-status-${code}`, {
                select: state.select?.includes(code),
              })}
              onClick={() => {
                setState({
                  select: state.select?.includes(code)
                    ? state.select.filter((val) => val !== code)
                    : (state.select || []).concat(code),
                })
              }}
            >
              <div className="point"></div>
              <div>{title}</div>
            </Flex>
          )
        })}
      </Flex>
      <Flex className="content" gap={10}>
        {HttpStatusList.map((item, i) => {
          const { title, code, children } = item
          return (
            <Flex
              key={i}
              gap={10}
              column
              style={{ width: '100%' }}
              className={classNames(`module code-status-${code}`, {
                hidden: state?.select?.includes(code),
              })}
            >
              <h3>{title}</h3>
              <Flex className="children" row center style={{ width: '100%' }}>
                {children.map((row, j) => {
                  const [code, subtitle, desc, label] = row
                  return (
                    <Flex key={j} className={'item'} column>
                      <div className="code">
                        <span className='code'>{code}</span>
                        <span className="label">{label}</span>
                      </div>
                      <div className="subtitle">{subtitle}</div>
                      <pre className="desc">{desc}</pre>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </div>
  )
}
