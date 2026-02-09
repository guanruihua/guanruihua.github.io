const options = {
  timeWeight: 0.6, // 时间权重
  freqWeight: 0.3, // 频率权重
  halfLife: 7 * 24 * 3600 * 1000, // 7天半衰期
}
/**
 * @description 计算权重分数
 * @param item
 * @returns
 */
export function calculateScore(visits: number[]) {
  const now = Date.now()

  // 1. 时间衰减因子（最近访问权重高）
  let timeScore = 0
  visits.forEach((time) => {
    const decay = Math.exp((-Math.log(2) * (now - time)) / options.halfLife)
    timeScore += decay
  })

  // 2. 访问频率因子
  const freqScore = Math.log(visits.length + 1)

  // 加权总分
  return (
    timeScore * options.timeWeight +
    freqScore * options.freqWeight 
  )
}
