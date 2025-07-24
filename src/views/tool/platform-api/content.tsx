import React from 'react'
import { InputEdit } from './input-edit'
import { Button, Div, Tab } from 'aurad'
import { JsonEdit } from './json-edit'
import { handleSend } from './utils'

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

  console.log(selectRecord)

  const { method = 'post', title = 'Template', url = '' } = selectRecord
  const [active, setActive] = React.useState('params')
  return (
    <div className="content">
      <Div className="title">
        <InputEdit
          key={state.lastUpdate}
          value={title}
          cb={(newVal) => handleEdit('title', newVal)}
        />
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
          type="primary"
          onClick={async () => {
            const res = await handleSend(selectRecord)
            setActive('result')
            handleEdit('resultTxt', JSON.stringify(res?.data, null, 2))
          }}
        >
          Send
        </Button>
      </div>
      <Tab
        value={active}
        onChange={setActive}
        items={[
          {
            key: 'headers',
            title: 'Headers',
            children: (
              <JsonEdit
                key={state.lastUpdate}
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
                key={state.lastUpdate}
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
                key={state.lastUpdate}
                value={selectRecord.bodyTxt}
                onChange={(newVal) => handleEdit('bodyTxt', newVal)}
              />
            ),
          },
          {
            key: 'result',
            title: 'Result',
            children: (
              <JsonEdit
                key={state.lastUpdate}
                value={selectRecord.resultTxt}
                onChange={(newVal) => handleEdit('resultTxt', newVal)}
              />
            ),
          },
        ]}
      />
    </div>
  )
}
