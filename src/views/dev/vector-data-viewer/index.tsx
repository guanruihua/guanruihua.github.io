import React from 'react'
import './index.less'
import { usePageState } from './state'
import { Tab, TabItemProps } from 'aurad'
import { VectorData } from './vector-data'
import { ProcessingData } from './processing-data'

export default function () {
  const h = usePageState()
  const { state, setState } = h

  const items: TabItemProps[] = [
    {
      key: 'vector-data',
      title: 'Vector Data',
      children: <VectorData h={h} />,
    },
    {
      key: 'processing-data',
      title: 'Processing Data',
      children: <ProcessingData h={h} />,
    },
  ]

  return (
    <div className="tool-vector-data-viewer">
      {/* <h3 className="title">{state.databaseName}</h3> */}
      <Tab
        value={state.active}
        items={items}
        onChange={(active) => setState({ active })}
      />
    </div>
  )
}
