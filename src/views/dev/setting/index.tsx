import { useConf } from '@/util'
import React from 'react'
import './index.less'

export default function () {
  const { conf, setConf } = useConf()

  return (
    <div className="dev-setting">
      <div className="layout">
        <div className="item">
          <div className="label">Server URL</div>
          <input
            className="value"
            type="text"
            value={conf.serverUrl || ''}
            onChange={(e) => {
              setConf({
                serverUrl: e.target.value,
              })
            }}
          />
        </div>
        <div className="item">
          <div className="label">DeepSeek Api Key</div>
          <input
            className="value"
            type="text"
            value={conf.deepSeekApiKey || ''}
            onChange={(e) => {
              setConf({
                deepSeekApiKey: e.target.value,
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
