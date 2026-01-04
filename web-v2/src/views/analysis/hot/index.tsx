import React from 'react'
import './index.less'

const Img = ({ src, ...rest }: any) => {
  const [url, setState] = React.useState('')
  React.useEffect(() => {
    src.then((res: any) => {
      console.log(res.default)
      setState(res.default)
    })
  }, [src])
  return <img src={url} {...rest} />
}

export default function () {
  return (
    <div className="analysis__hot">
      <h2>Hot</h2>
      {/* <div className='analysis__hot-card'>
        <div className="analysis__hot-card-title"></div>
        <div className="analysis__hot-card-desc"></div>
        <div className="analysis__hot-card-tabs">
          <div className="analysis__hot-card-tab-source">来源</div>
          <div className="analysis__hot-card-tab-official official-info">官方信息</div>
          <div className="analysis__hot-card-tab-official official-refutation">官方辟谣</div>
        </div>
        <Img
          style={{ maxWidth: 300, maxHeight: 200 }}
          src={import('./image/a1.png')}
        /> 
      </div> */}
    </div>
  )
}
