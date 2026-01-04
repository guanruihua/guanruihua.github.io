import React from 'react'
import { InputEdit } from '../components/input-edit'
import { Button, Div, Tab } from 'aurad'
import { JsonEdit } from '../components/json-edit'
import { handleSend } from '../utils'
import { Result } from './result'
import { useSetState } from '0hook'

export interface ContentProps {
  state: any
  handleEdit: any
  [key: string]: any
}

export function Content(props: ContentProps) {
  const { state, handleEdit } = props

  const selectRecord: any =
    state.list?.find((_: any) => _.id === state.selectId) ||
    state.list?.[0] ||
    {}

  // console.log(selectRecord)

  const { method = 'post', title = 'Template', url = '' } = selectRecord
  const [loading, setLoading] = React.useState(false)
  const [own, setOwn] = useSetState(
    {
      active: 'body',
    },
    'tool/platform-api>content>active',
  )

  return (
    <div className="content">
      <Div className="title">
        <InputEdit
          key={state.lastUpdate}
          value={title}
          cb={(newVal) => handleEdit('title', newVal)}
        />
        {/* <Button
          type="primary"
          style={
            {
              marginLeft: 10,
              '--color': 'rgba(255, 0,0, .9)',
              '--hover-color': 'rgba(255, 0,0, .3)',
            } as React.CSSProperties
          }
        >
          DEL
        </Button> */}
      </Div>
      <div className="header">
        <Div className="method" classNames={[method]}>
          <InputEdit
            key={state.lastUpdate}
            value={method}
            cb={(newVal) => handleEdit('method', newVal)}
          />
        </Div>
        <div className="url">
          <InputEdit
            key={state.lastUpdate}
            value={url}
            cb={(newVal) => handleEdit('url', newVal)}
          />
        </div>
        <Button
          disabled={loading}
          type="primary"
          onClick={async () => {
            const startTime = performance.now()
            setLoading(true)
            const res = await handleSend(selectRecord)
            setOwn({ active: 'result' })
            handleEdit('results', JSON.stringify(res, null, 2), {
              responseTime: performance.now() - startTime,
            })
            setTimeout(() => {
              setLoading(false)
            }, 1000)
          }}
        >
          Send
        </Button>
      </div>
      <Tab
        value={own.active}
        onChange={(val) => setOwn({ active: val })}
        items={[
          {
            key: 'headers',
            title: 'Headers',
            children: (
              <JsonEdit
                value={selectRecord.headerTxt}
                onChange={(newVal) => handleEdit('headerTxt', newVal)}
              />
            ),
          },
          {
            key: 'params',
            title: 'Params',
            children: (
              <JsonEdit
                value={selectRecord.paramsTxt}
                onChange={(newVal) => handleEdit('paramsTxt', newVal)}
              />
            ),
          },
          {
            key: 'body',
            title: 'Body',
            children: (
              <JsonEdit
                value={selectRecord.bodyTxt}
                onChange={(newVal) => handleEdit('bodyTxt', newVal)}
              />
            ),
          },
          {
            key: 'result',
            title: 'Result',
            children: (
              <Result selectRecord={selectRecord} handleEdit={handleEdit} />
            ),
          },
        ]}
      />
    </div>
  )
}
