export const toCircle = (canvas: HTMLCanvasElement): Promise<string> => {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      resolve('')
      return
    }
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const size = Math.min(canvas.width, canvas.height)

    // 创建新的圆形画布
    const circleCanvas = document.createElement('canvas')
    circleCanvas.width = size
    circleCanvas.height = size
    const circleCtx = circleCanvas.getContext('2d', {
      willReadFrequently: true,
    })
    if (!circleCtx) {
      resolve('')
      return
    }

    circleCtx.clearRect(0, 0, size, size)
    // 创建圆形路径
    circleCtx.beginPath()
    circleCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    circleCtx.closePath()
    circleCtx.clip()

    // 将原始canvas内容绘制到圆形canvas中
    circleCtx.drawImage(canvas, 0, 0, size, size)

    resolve(circleCanvas.toDataURL('image/png'))
  })
}

export const downloadData = async (
  data: any,
  fileName: string = 'temp.png',
) => {
  if (data) {
    const link = document.createElement('a')
    link.href = data
    link.download = fileName
    link.click()
  }
}
export const downloadCanvas = async (
  canvas: any,
  fileName: string = 'temp.png',
) => {
  if (canvas) {
    const link = document.createElement('a')
    link.href = await toCircle(canvas)
    link.download = fileName
    link.click()
  }
}
