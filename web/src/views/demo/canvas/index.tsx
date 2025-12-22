import React from 'react'
import { Div, Docs, DocsItemProps } from 'aurad'
import { Tmp } from './tmp'
import './index.less'

export default function () {
  const items: DocsItemProps[] = [
    {
      title: '基础绘制',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.moveTo(100, 100)
            cxt.lineTo(200, 100)
            cxt.stroke()
            cxt.moveTo(100, 120.5)
            cxt.lineTo(200, 120.5)
            cxt.stroke()
          }}
        >
          <Div>线条的渲染最小单位为1px, 单位出现小数, 只会渲染一部分</Div>
        </Tmp>
      ),
    },
    {
      title: '设置样式',
      children: (
        <Tmp
          draw={(cxt) => {
            // 绘制直线
            cxt.moveTo(50, 50)
            cxt.lineTo(200, 50)

            // 修改直线的宽度
            cxt.lineWidth = 20
            // 修改直线的颜色
            cxt.strokeStyle = 'pink'
            // 修改直线两端样式
            cxt.lineCap = 'round' // 默认: butt; 圆形: round; 方形: square
            cxt.stroke()
          }}
        />
      ),
    },
    {
      title: '使用beginPath(), 防止线条样式污染',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.moveTo(20, 100)
            cxt.lineTo(200, 100)
            cxt.lineWidth = 10
            cxt.strokeStyle = 'pink'
            cxt.stroke()

            cxt.beginPath() // 重新开启一个路径
            cxt.moveTo(20, 120.5)
            cxt.lineTo(200, 120.5)
            cxt.lineWidth = 4
            cxt.strokeStyle = 'red'
            cxt.stroke()
          }}
        />
      ),
    },
    {
      title: '折线',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.moveTo(50, 150)
            cxt.lineTo(100, 50)
            cxt.lineTo(200, 150)
            cxt.lineTo(250, 50)

            cxt.stroke()
          }}
        />
      ),
    },
    {
      title: '矩形',
      children: (
        <Tmp
          draw={(cxt) => {
            // 绘制矩形
            cxt.moveTo(50, 50)
            cxt.lineTo(200, 50)
            cxt.lineTo(200, 120)
            cxt.lineTo(50, 120)
            cxt.closePath()
            // cxt.lineTo(50, 50) // 需要闭合，又或者使用 closePath() 方法进行闭合，推荐使用 closePath()

            cxt.stroke()
          }}
        />
      ),
    },
    {
      title: '使用 strokeRect() 描边矩形',
      children: (
        <Tmp
          draw={(cxt) => {
            // strokeStyle 属性
            // strokeRect(x, y, width, height) 方法
            cxt.strokeStyle = 'pink'
            cxt.strokeRect(50, 50, 200, 100)
          }}
        />
      ),
    },
    {
      title: '使用 fillRect() 填充矩形',
      children: (
        <Tmp
          draw={(cxt) => {
            // fillStyle 属性
            // fillRect(x, y, width, height) 方法
            cxt.fillStyle = 'pink'
            cxt.fillRect(50, 50, 200, 100) // fillRect(x, y, width, height)
          }}
        />
      ),
    },
    {
      title: '同时使用 strokeRect() 和 fillRect()',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.strokeStyle = 'red'
            cxt.strokeRect(50, 50, 200, 100) // strokeRect(x, y, width, height)
            cxt.fillStyle = 'yellow'
            cxt.fillRect(50, 50, 200, 100) // fillRect(x, y, width, height)
          }}
        />
      ),
    },
    {
      title: '使用 clearRect() 清空矩形',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.fillStyle = 'pink' // 设置填充颜色
            cxt.fillRect(50, 10, 200, 200) // 填充矩形
            cxt.clearRect(60, 20, 180, 90) // 清空矩形
          }}
        />
      ),
    },
    {
      title: '绘制圆形  arc()',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.beginPath()
            cxt.arc(150, 100, 80, 0, (360 * Math.PI) / 180)
            cxt.closePath()
            cxt.stroke()
          }}
        >
          <Div>arc(x, y, r, sAngle, eAngle，counterclockwise)</Div>
          <ul>
            <li>x 和 y: 圆心坐标</li>
            <li>r: 半径</li>
            <li>sAngle: 开始角度</li>
            <li>eAngle: 结束角度</li>
            <li>
              counterclockwise: 绘制方向（true: 逆时针; false: 顺时针），默认
              false
            </li>
          </ul>
        </Tmp>
      ),
    },
    {
      title: '半圆',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.beginPath()
            cxt.arc(150, 100, 80, 0, Math.PI)
            cxt.closePath()
            cxt.stroke()
          }}
        />
      ),
    },
    {
      title: 'arc() 画弧线',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.beginPath()
            cxt.arc(150, 100, 100, 0, (30 * Math.PI) / 180)
            cxt.stroke()
          }}
        >
          不执行closePath()
        </Tmp>
      ),
    },
    {
      title: 'arcTo() 画弧线',
      children: (
        <Tmp
          draw={(cxt) => {
            cxt.beginPath()
            cxt.moveTo(40, 40)
            cxt.arcTo(120, 40, 120, 120, 80)
            cxt.stroke()
          }}
        >
          <p>arcTo(cx, cy, x2, y2, radius)</p>
          <ul>
            <li>cx: 两切线交点的横坐标</li>
            <li>cy: 两切线交点的纵坐标</li>
            <li>x2: 结束点的横坐标</li>
            <li>y2: 结束点的纵坐标</li>
            <li>radius: 半径</li>
          </ul>
        </Tmp>
      ),
    },
  ]
  // return <Docs items={[items.at(-1) as DocsItemProps]} />
  return <Docs items={items} />
}
