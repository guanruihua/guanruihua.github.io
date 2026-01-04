import React from 'react'
import { FlowChart } from '..'
import { nodes } from './data'
import { Docs } from 'aurad'

export default () => {
  return (
    <Docs
      items={[
        {
          title: 'Flow',
          children: <FlowChart nodes={nodes} count={5} name='314' />,
        },
        {
          title: 'Flow',
          children: (
            <FlowChart
              nodes={nodes}
              count={5}
              name='a315'
              nodeWidth={'equal'}
            />
          ),
        },
      ]}
    />
  )
}
