import { Button, Chart, Flex, Grid } from 'aurad'
import React from 'react'
import { usePageState } from './state'
import { load } from './load'
import { options } from './conf'
import './index.less'

export default function () {
  load()
  const u = usePageState()

  return (
    <Flex column className="dev__dom-to-image">
      <div>DOM转图片</div>
      <Flex>
        <Button onClick={u.handle.domToImage}>Dom to Image</Button>
        <Button onClick={u.handle.downloadImage}>Download Image</Button>
      </Flex>
      <Grid columns={2} className="container">
        <div className="left">
          <h1>DOM转图片示例</h1>
          <div
            className="target-element"
            ref={u.domRef}
            style={{ padding: 10 }}
          >
            <Chart
              style={{
                width: 600,
                height: 400,
                background: '#fff',
                zoom: '.5',
              }}
              options={options}
            />
            <h2>这是一个纯DOM元素</h2>
            <p>这段内容将被转换为图片</p>
            <div style={{ display: 'flex', gap: '20px', margin: '15px 0' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ff6b6b',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#4ecdc4',
                }}
              ></div>
            </div>
            <p>使用纯JavaScript实现转换</p>
          </div>
        </div>
        <div className="right">
          <h1>DOM转图片预览</h1>
          <div className="preview-element" ref={u.previewRef}></div>
        </div>
      </Grid>
    </Flex>
  )
}
