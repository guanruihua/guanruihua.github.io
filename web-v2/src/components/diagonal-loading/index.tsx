import { CSSProperties } from 'react'
import './index.less'

type Props = {
  style?: CSSProperties
}

export function DiagonalLoading(props: Props) {
  return (
    <div className="diagonal-loading" {...props}>
      <div className="stripes">
        <div className="stripes_inner"></div>
      </div>
    </div>
  )
}
