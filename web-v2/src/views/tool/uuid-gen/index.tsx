import { useSetState } from '0hook'
import { isArray, isEffectArray, isNumber } from 'asura-eye'
import { Box, Button, Flex, Input } from 'aurad'
import { copyText } from 'harpe'
import React from 'react'

export default function () {
  const [state, setState] = useSetState<{
    uuids: string[]
    format: string
    num: string | number
  }>(
    {
      uuids: [],
      format: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      num: 1,
    },
    'tool__uuid-gen__cache',
  )
  const num = Number(state.num)

  const addUUID = (uuids: string | string[]) => {
    setState({
      uuids: isArray(uuids) ? uuids : [uuids],
    })
  }
  function genFormatUUID() {
    const gen = () =>
      (state.format || '').replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })

    const value = gen()
    if (isNumber(num)) {
      addUUID(new Array(num).fill('').map(() => gen()))
      return
    }
    addUUID(value)
  }
  const genUUID = () => {
    if (isNumber(num)) {
      addUUID(new Array(num).fill('').map(() => window.crypto.randomUUID()))
      return
    }
    addUUID(window.crypto.randomUUID())
  }
  return (
    <Flex column className="tool__uuid-gen">
      <h4>Format</h4>
      <Input
        value={state.format}
        onChange={(e: any) => {
          setState({
            format: e.target.value || '',
          })
        }}
      />
      <h4>数量</h4>
      <Input
        // type="number"
        value={state.num}
        onChange={(e: any) => {
          setState({
            num: e.target.value || '',
          })
        }}
      />
      <Flex row>
        <Button type="primary" disabled={!state.format} onClick={genFormatUUID}>
          使用 Format 生成
        </Button>
        <Button type="primary" onClick={genUUID}>
          生成
        </Button>
        <Button
          disabled={!isEffectArray(state.uuids)}
          onClick={() => {
            isEffectArray(state.uuids) && copyText(state.uuids?.join('\n'))
          }}
        >
          复制
        </Button>
        <Button
          onClick={() =>
            setState({
              format: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
              num: 1,
              uuids: [],
            })
          }
        >
          重置
        </Button>
        <Button onClick={() => setState({ uuids: [] })}>清空</Button>
      </Flex>
      <Box
        style={{
          width: '100%',
          minHeight: 64,
          maxHeight: '50vh',
          overflow: 'auto',
        }}
      >
        {state.uuids?.map((val, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            {val}
          </div>
        ))}
      </Box>
    </Flex>
  )
}
