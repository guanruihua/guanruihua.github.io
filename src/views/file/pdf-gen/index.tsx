import { Button, Box, Flex, Chart } from 'aurad'
import React from 'react'
import { usePageState } from './state'
import { load } from './load'
import { options } from './conf'
import './index.less'

export default function () {
  const u = usePageState()

  load()

  return (
    <Flex row className="tool-pdd-gen">
      <Flex>
        <div
          ref={u.pageRef}
          className="pdf-container"
          style={{
            color: '#000',
            background: '#fff',
            width: u.psw - 20,
            height: u.psh - 20,
            padding: 10,
          }}
        >
          <h2 style={{ textAlign: 'center' }}>我是 Page 1 标题</h2>
          <Chart
            style={{
              width: 600,
              height: 400,
              background: '#fff',
              zoom: '.5',
            }}
            options={options}
          />
          <h2>标题</h2>
          <p>这段内容将被转换为图片</p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              margin: '15px 0',
              flexDirection: 'column',
            }}
          >
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
            <div>
              我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本
            </div>
          </div>
        </div>
        <div
          ref={u.page2Ref}
          className="pdf-container"
          style={{
            color: '#000',
            background: '#fff',
            width: u.psw - 20,
            height: u.psh - 20,
            padding: 10,
          }}
        >
          <h2 style={{ textAlign: 'center' }}>我是 Page 2 标题</h2>
          <Chart
            style={{
              width: 600,
              height: 400,
              background: '#fff',
              zoom: '.5',
            }}
            options={options}
          />
          <h2>标题</h2>
          <p>这段内容将被转换为图片</p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              margin: '15px 0',
              flexDirection: 'column',
            }}
          >
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
            <div>
              我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本
            </div>
          </div>
        </div>
      </Flex>
      <Flex column center>
        <span>PDF GEN</span>
        <Button onClick={u.genPDF}>GEN PDF</Button>
      </Flex>
    </Flex>
  )
}
