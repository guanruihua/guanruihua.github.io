import React from 'react'
import { Flex } from 'aurad'
import { usePageState } from './state'

export default function () {
  const { soundRef } = usePageState()
  return (
    <div className="dev__music-howler">
      <Flex>
        <button onClick={() => soundRef.current?.play?.()}>播放</button>
        <button onClick={() => soundRef.current?.pause?.()}>暂停</button>
      </Flex>
    </div>
  )
}
