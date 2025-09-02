import { Button } from 'aurad'
import React from 'react'
import { usePageState } from './state'
import { load } from './load'
import { Chart } from './chart'

export default function () {
  load()
  const u = usePageState()

  return (
    <div className="dev__dom-to-image">
      <div>dom-to-image</div>
      <Button onClick={() => u.domToImage()}>To</Button>

      <div className="container">
        <h1>DOM转图片示例</h1>

        {/* 要转换的DOM元素 */}
        <div className="target-element" ref={u.domRef}>
          <Chart
            style={{
              height: 400,
              background: '#fff',
              zoom: '.5',
            }}
            options={{
              xAxis: {
                type: 'value', // 数值轴
              },
              yAxis: {
                type: 'value', // 数值轴
              },
              series: [
                {
                  symbolSize: 10,
                  data: [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [13.0, 7.58],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [14.0, 7.66],
                    [13.4, 6.81],
                    [10.0, 6.33],
                    [14.0, 8.96],
                    [12.5, 6.82],
                    [9.15, 7.2],
                    [11.5, 7.2],
                    [3.03, 4.23],
                    [12.2, 7.83],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68],
                  ],
                  type: 'scatter',
                },
              ],
            }}
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

        <button
          onClick={u.handleDownloadImage}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          下载PNG图片
        </button>
      </div>
    </div>
  )
}
