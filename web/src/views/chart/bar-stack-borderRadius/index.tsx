import { Button, Chart, Flex } from 'aurad'
import React from 'react'
import { getOptions } from './helper'
import { useSetState } from '0hook'

export default function () {
  const [state, setState] = useSetState({
    type: '1',
  })

  return (
    <div className="chart__bar-stack-borderRadius">
      <Flex>
        <Button
          type={state.type === '1' ? 'primary' : 'default'}
          onClick={() => setState({ type: '1' })}
        >
          Case 1
        </Button>
        <Button
          type={state.type === '2' ? 'primary' : 'default'}
          onClick={() => setState({ type: '2' })}
        >
          Case 2
        </Button>
      </Flex>
      <Chart
        key={state.type}
        style={{ width: 800, height: 400 }}
        options={getOptions(state.type || '1')}
      />
    </div>
  )
}
