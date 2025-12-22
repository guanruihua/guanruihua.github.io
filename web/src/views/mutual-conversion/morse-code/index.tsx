import { useSetState } from '0hook'
import { Button, Flex, Grid, TextArea } from 'aurad'
import React from 'react'
import { morseCode2String, string2MorseCode } from './helper'

export default function () {
  const [state, setState] = useSetState({
    string: '',
    morseCode: '',
    type: 'String2morseCode',
  }, location.hash)
  return (
    <Grid
      className="mutual-conversion__morse-code"
      columns={2}
      style={{ gridTemplateRows: 'auto 1fr' }}
    >
      <Flex row style={{ gridColumn: '1/-1', height: '100%' }}>
        <Button
          type={state.type === 'String2morseCode' ? 'primary' : 'default'}
          onClick={() =>
            setState({
              type: 'String2morseCode',
              morseCode: string2MorseCode(state?.string || ''),
            })
          }
        >
          字串 to 摩斯密码
        </Button>
        <Button
          type={state.type === 'MorseCode2String' ? 'primary' : 'default'}
          onClick={() =>
            setState({
              type: 'MorseCode2String',
              string: morseCode2String(state?.morseCode || ''),
            })
          }
        >
          摩斯密码 to 字串
        </Button>
      </Flex>
      <TextArea
        value={state.string || ''}
        onChange={(e: any) => {
          const value = e.target.value
          setState({
            string: value,
            morseCode: string2MorseCode(value),
          })
        }}
      />
      <TextArea
        value={state.morseCode || ''}
        onChange={(e: any) => {
          const value = e.target.value
          setState({
            morseCode: value,
            string: morseCode2String(value),
          })
        }}
      />
    </Grid>
  )
}
