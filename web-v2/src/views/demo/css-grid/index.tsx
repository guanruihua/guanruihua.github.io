import React from 'react'
import { Docs, Split } from 'aurad'
import './index.less'

export default function () {
  const doms = new Array(10)
    .fill('')
    .map((_, i: number) => <div key={i}>{i}</div>)
  const Temp = (props: { style: React.CSSProperties }) => {
    return (
      <div
        className="grid"
        style={{
          ...props.style,
        }}
      >
        {doms}
      </div>
    )
  }

  return (
    <div className="study-page-css-grid md">
      <Docs
        items={[
          {
            title: 'Grid',
            children: '',
          },
          {
            title: 'auto-fix',
            children: (
              <div>
                <ul>
                  <li>每个卡片最小宽度 200px，剩余空间平均分配</li>
                  <li>屏幕变窄时自动换行</li>
                  <li>多余空间会填充</li>
                </ul>
                <Split
                  items={[
                    {
                      min: 300,
                      max: 1000,
                      children: (
                        <Temp
                          style={{
                            gridTemplateColumns: `repeat(auto-fit, minmax(50px, 1fr))`,
                          }}
                        />
                      ),
                    },
                    {
                      children: (
                        <Temp
                          style={{
                            gridTemplateColumns: `repeat(auto-fit, minmax(50px, 1fr))`,
                          }}
                        />
                      ),
                    },
                  ]}
                ></Split>
              </div>
            ),
          },
          {
            title: 'auto-fill',
            children: (
              <div>
                <ul>
                  <li>每个卡片最小宽度 200px，剩余空间平均分配</li>
                  <li>屏幕变窄时自动换行</li>
                </ul>
                <Split
                  items={[
                    {
                      min: 300,
                      max: 1000,
                      children: (
                        <Temp
                          style={{
                            gridTemplateColumns: `repeat(auto-fill, minmax(50px, 1fr))`,
                          }}
                        />
                      ),
                    },
                    {
                      children: (
                        <Temp
                          style={{
                            gridTemplateColumns: `repeat(auto-fill, minmax(50px, 1fr))`,
                          }}
                        />
                      ),
                    },
                  ]}
                ></Split>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
