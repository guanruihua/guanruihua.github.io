import React from 'react'
import { Div, Input, Button, Flex } from 'aurad'
import { ModelOptions, URLOptions } from './conf'
import { useConf } from '@/util'

export interface LeftProps {
  [key: string]: any
}

export function Left(props: LeftProps) {
  const { state, setState, handleClearHistory, handleStop } = props
  const handleSelectModel = (val: string) => {
    if (val === 'Custom') {
      setState({
        model: '',
        customModel: true,
      })
      return
    }
    setState({
      model: val,
      customModel: false,
    })
  }
  const handleSelectURL = (val: string) => {
    // console.log('url',val)
    if (val === 'Custom') {
      setState({
        url: '',
        customURL: true,
      })
      return
    }
    setState({
      url: val,
      customURL: false,
    })
  }
  const { conf, setConf } = useConf()

  return (
    <div className="left-aside">
      <Div className="ai-model">
        <div className="item">
          <div className="label">Server URL</div>
          <Input
            value={conf.serverUrl}
            onChange={(e: any) =>
              setConf({
                serverUrl: e.target.value,
              })
            }
          />
        </div>
        <div className="item">
          <div className="label"> Api Key</div>
          <Input
            value={state.apiKey}
            onChange={(e: any) =>
              setState({
                apiKey: e.target.value,
              })
            }
          />
        </div>
        <div className="item">
          <div className="label">Model</div>
          <Flex className="model-box">
            {ModelOptions.map(({ label, value }) => (
              <Div
                key={value}
                className="item"
                classNames={{
                  select: state.customModel
                    ? value === 'Custom'
                    : value === state.model,
                }}
                onClick={() => handleSelectModel(value)}
              >
                {label}
              </Div>
            ))}
            {state.customModel && (
              <Input
                value={state.model}
                onChange={(e: any) =>
                  setState({
                    model: e.target.value,
                  })
                }
              />
            )}
          </Flex>
        </div>
        <div className="item">
          <div className="label">URL</div>
          <Flex className="url-box">
            {URLOptions.map(({ label, value }) => (
              <Div
                key={value}
                className="item"
                classNames={{
                  select: state.customURL
                    ? value === 'Custom'
                    : value === state.url,
                }}
                onClick={() => handleSelectURL(value)}
              >
                {label}
              </Div>
            ))}
            {state.customURL && (
              <Input
                value={state.url}
                onChange={(e: any) =>
                  setState({
                    url: e.target.value,
                  })
                }
              />
            )}
          </Flex>
        </div>
      </Div>

      <Button
        type={state.enabledRAG ? 'primary' : 'default'}
        onClick={() => {
          setState({
            enabledRAG: !state.enabledRAG,
          })
        }}
      >
        Enabled RAG
      </Button>
      <Button onClick={() => handleStop()}>Stop</Button>
      <Button onClick={() => handleClearHistory()}>Clear History</Button>
    </div>
  )
}
