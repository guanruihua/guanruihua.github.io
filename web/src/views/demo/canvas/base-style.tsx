import { Docs, DocsItemProps, Grid } from 'aurad'
import React from 'react'
import { Tmp } from './tmp'

export default function BaseStyle() {
  const items: DocsItemProps[] = [
    {
      title: '描边 stroke()',
      children:
        '前面的案例中，其实已经知道使用 stroke() 方法进行描边了。这里就不再多讲这个方法。',
    },
    {
      title: '线条宽度 lineWidth',
      children: (
        <Grid>
          <p>lineWidth 默认值是 1 ，默认单位是 px。</p>
          <Tmp
            draw={(cxt) => {
              // 线宽 10
              cxt.beginPath()
              cxt.moveTo(50, 50)
              cxt.lineTo(250, 50)
              cxt.lineWidth = 10 // 设置线宽
              cxt.stroke()

              // 线宽 20
              cxt.beginPath()
              cxt.moveTo(50, 100)
              cxt.lineTo(250, 100)
              cxt.lineWidth = 20 // 设置线宽
              cxt.stroke()

              // 线宽 30
              cxt.beginPath()
              cxt.moveTo(50, 150)
              cxt.lineTo(250, 150)
              cxt.lineWidth = 30 // 设置线宽
              cxt.stroke()
            }}
          />
        </Grid>
      ),
    },
    {
      title: '线条颜色 strokeStyle',
      children: (
        <Grid>
          <Tmp
            draw={(cxt) => {
              cxt.moveTo(50, 50)
              cxt.lineTo(250, 50)
              cxt.lineWidth = 20
              cxt.strokeStyle = 'pink' // 设置颜色
              cxt.stroke()
            }}
          />
        </Grid>
      ),
    },
    {
      title: '线帽 lineCap',
      children: (
        <Grid>
          <p>属性值包括：</p>
          <ul>
            <li>butt: 默认值，无线帽</li>
            <li>square: 方形线帽</li>
            <li>round: 圆形线帽</li>
          </ul>
          <Tmp
            draw={(cxt) => {
              // 线宽 10
              cxt.beginPath()
              cxt.moveTo(50, 50)
              cxt.lineTo(250, 50)
              cxt.lineWidth = 10 // 设置线宽
              cxt.stroke()

              // 线宽 20
              cxt.beginPath()
              cxt.lineCap = 'square'
              cxt.moveTo(50, 100)
              cxt.lineTo(250, 100)
              cxt.lineWidth = 20 // 设置线宽
              cxt.stroke()

              // 线宽 30
              cxt.beginPath()
              cxt.lineCap = 'round'
              cxt.moveTo(50, 150)
              cxt.lineTo(250, 150)
              cxt.lineWidth = 30 // 设置线宽
              cxt.stroke()
            }}
          />
        </Grid>
      ),
    },
    {
      title: '拐角样式 lineJoin',
      children: (
        <Grid>
          <p>属性值包括：</p>
          <ul>
            <li>miter: 默认值，尖角</li>
            <li>round: 圆角</li>
            <li>bevel: 斜角</li>
          </ul>
          <Tmp
            draw={(cxt) => {
              // 线宽 10
              cxt.beginPath()
              cxt.moveTo(50, 50)
              cxt.lineTo(250, 50)
              cxt.lineTo(250, 90)
              cxt.lineWidth = 10 // 设置线宽
              cxt.stroke()

              // 线宽 20
              cxt.beginPath()
              cxt.moveTo(50, 100)
              cxt.lineTo(250, 100)
              cxt.lineTo(250, 140)
              cxt.lineWidth = 10 // 设置线宽
              cxt.lineJoin = 'bevel'
              cxt.stroke()

              // 线宽 30
              cxt.beginPath()
              cxt.moveTo(50, 150)
              cxt.lineTo(250, 150)
              cxt.lineTo(250, 190)
              cxt.lineWidth = 10 // 设置线宽
              cxt.lineJoin = 'round'
              cxt.stroke()
            }}
          />
        </Grid>
      ),
    },
    {
      title: '虚线 setLineDash()',
      children: (
        <Grid>
          <p>虚线分3种情况</p>
          <ul>
            <li>只传1个值</li>
            <li>有2个值</li>
            <li>有3个以上的值</li>
          </ul>
          <Tmp
            draw={(cxt) => {
              cxt.lineWidth = 10 // 设置线宽
              // 线宽 10
              cxt.beginPath()
              cxt.moveTo(50, 50)
              cxt.lineTo(250, 50)
              cxt.setLineDash([10]) // 只传1个参数，实线与空白都是 10px
              cxt.stroke()

              // 线宽 20
              cxt.beginPath()
              cxt.moveTo(50, 100)
              cxt.lineTo(250, 100)
              cxt.setLineDash([10, 20]) // 2个参数，此时，实线是 10px, 空白 20px
              cxt.stroke()

              // 线宽 30
              cxt.beginPath()
              cxt.moveTo(50, 150)
              cxt.lineTo(250, 150)
              cxt.setLineDash([10, 20, 5]) // 传3个以上的参数，此例：10px实线，20px空白，5px实线，10px空白，20px实线，5px空白 ……
              cxt.stroke()
            }}
          >
            <p>还可以始终 cxt.getLineDash() 获取虚线不重复的距离； </p>
            <p>用 cxt.lineDashOffset 设置虚线的偏移位。</p>
          </Tmp>
        </Grid>
      ),
    },
    {
      title: '填充 fill() & fillStyle',
      children: (
        <Grid>
          <Tmp
            draw={(cxt) => {
              // 线宽 10
              cxt.beginPath()
              cxt.fillStyle = 'pink'
              cxt.moveTo(50, 50)
              cxt.lineTo(250, 50)
              cxt.lineTo(250, 90)
              cxt.lineTo(50, 90)
              cxt.closePath()
              cxt.fill('evenodd')
              cxt.stroke()

              cxt.beginPath()
              cxt.rect(50, 120, 200, 50)
              cxt.fill()


              cxt.stroke()
            }}
          >
            {/* <p>还可以始终 cxt.getLineDash() 获取虚线不重复的距离； </p>
            <p>用 cxt.lineDashOffset 设置虚线的偏移位。</p> */}
          </Tmp>
        </Grid>
      ),
    },
  ].reverse()
  return <Docs items={items} />
}
