import React from 'react'
import { TextMiddleEllipsis, TextStroke } from '..'
import { Docs, Grid } from 'aurad'
import './index.less'

export default function () {
  return (
    <Docs className="demo__text">
      <Grid columns={1}>
        <div
          className="resize"
          style={{
            width: 300,
            resize: 'horizontal',
            overflow: 'auto',
            border: '1px solid #333',
          }}
        >
          <TextMiddleEllipsis>
            CSS 实现优惠券的技巧 - 2021-03-26
          </TextMiddleEllipsis>
          <TextMiddleEllipsis>
            CSS
            测试标题，这是一个稍微有点长的标题，超出一行以后才会有title提示，标题是
            实现优惠券的技巧 - 2021-03-26
          </TextMiddleEllipsis>
          <TextMiddleEllipsis> CSS 拖拽?</TextMiddleEllipsis>
          <TextMiddleEllipsis>CSS 文本超出自动显示title</TextMiddleEllipsis>
        </div>

        <TextStroke>Text Stroke</TextStroke>
        <TextStroke>Text Stroke</TextStroke>
        <TextStroke>Text Stroke</TextStroke>
        <TextStroke width={200}>
          Text Stroke Text StrokeText StrokeText StrokeText StrokeText
          StrokeText StrokeText StrokeText StrokeText StrokeText StrokeText
          StrokeText Stroke
        </TextStroke>
        <div className="a-row">
          <div className="wrap">
            <div className="infos">
              <div>Soccer</div>
              <div className="self">
                Campeonato De Reserva De Primera Division C
              </div>
            </div>
            <div className="live">Live</div>
          </div>
        </div>
      </Grid>
    </Docs>
  )
}
