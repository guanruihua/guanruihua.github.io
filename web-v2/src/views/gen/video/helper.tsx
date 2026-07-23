// 绘制倒计时数字
export const drawCountdown = (
  ctx: CanvasRenderingContext2D,
  second: number,
) => {
  const { width, height } = ctx.canvas
  ctx.clearRect(0, 0, width, height)

  // 背景
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1a1a2e')
  gradient.addColorStop(1, '#16213e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // 数字
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `bold ${Math.min(width, height) * 0.4}px Arial`
  ctx.fillStyle = '#e94560'
  ctx.shadowColor = '#e94560'
  ctx.shadowBlur = 30
  ctx.fillText(second.toString(), width / 2, height / 2)

  // 底部提示
  ctx.shadowBlur = 0
  ctx.font = '20px Arial'
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.fillText('倒计时', width / 2, height - 60)
}
