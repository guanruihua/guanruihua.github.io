import React from 'react'
import { classifyColor, hexToRgb } from './utils'
import { useSetState } from '0hook'

export default function () {
  const [state, setState] = useSetState(
    {
      color: '',
      type: '',
    },
    location.hash,
  )
  // const analyzeColors = () => {
  //   if (!ctx.value || !canvas.value) return

  //   const imageData = ctx.value.getImageData(
  //     0,
  //     0,
  //     canvas.value.width,
  //     canvas.value.height,
  //   )
  //   const data = imageData.data

  //   let warmPixels = 0
  //   let coolPixels = 0

  //   // 高效像素遍历 - 每4个元素为一个RGBA像素
  //   for (let i = 0; i < data.length; i += 4) {
  //     const r = data[i]
  //     const g = data[i + 1]
  //     const b = data[i + 2]
  //     // Alpha通道在data[i + 3]，这里我们忽略透明度

  //     const colorType = classifyColor(r, g, b)
  //     if (colorType === 'warm') {
  //       warmPixels++
  //     } else if (colorType === 'cold') {
  //       coolPixels++
  //     }
  //     // 中性色不计入统计
  //   }

  //   // 实时计算比例并更新UI
  //   const colorPixels = warmPixels + coolPixels
  //   warmRatio.value =
  //     colorPixels > 0 ? Math.round((warmPixels / colorPixels) * 100) : 0
  //   coolRatio.value =
  //     colorPixels > 0 ? Math.round((coolPixels / colorPixels) * 100) : 0

  //   // 触发动画更新
  //   updateVisualization()
  // }

  return (
    <div className="tool__color-analysis-warm-cold">
      <div>{state.type}</div>
      <input
        type="color"
        value={state.color}
        onChange={(e) => {
          const value = e.target.value
          const c = hexToRgb(value)
          // console.log(value, c)
          setState({
            color: value,
            type: classifyColor(c.r, c.g, c.b),
          })
        }}
      />
    </div>
  )
}
