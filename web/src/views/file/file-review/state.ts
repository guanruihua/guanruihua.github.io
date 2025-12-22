import React from 'react'
import { useSetState } from '0hook'

export const usePageState = () => {
  const [state, setState] = useSetState(
    {
      selectFileType: '',
      review: '',
    },
    'dev/file-review|cache',
  )

  return { state, setState }
}
