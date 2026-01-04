export const classifyColor = (r: number, g: number, b: number) => {
  // RGB-HSV混合模型
  // 转换为HSV
  const cR = r / 255
  const cG = g / 255
  const cB = b / 255
  // 计算HSV中的H(色相)和S(饱和度)
  const max = Math.max(cR, cG, cB)
  const min = Math.min(cR, cG, cB)
  let h = max

  const d = max - min
  const s = max === 0 ? 0 : d / max

  // 计算色相角度(0-360°)
  if (max === min) {
    h = 0 // 无色调(灰度)
  } else {
    switch (max) {
      case cR:
        h = (cG - cB) / d + (cG < cB ? 6 : 0)
        break
      case cG:
        h = (cB - cR) / d + 2
        break
      case cB:
        h = (cR - cG) / d + 4
        break
    }
    h *= 60
  }
  const lightness = (max + min) / 2
  if ((s < 0.1 && (h < 140 || h > 280)) || lightness < 0.1 || lightness > 0.9)
    return 'neutral'

  // 自适应权重调整
  const rWeight = 0.5 + (cR - 0.5) * 0.5
  const gWeight = 0.3 + (cG - 0.5) * 0.3
  const bWeight = 0.2 + (cB - 0.5) * 0.2

  // 智能分类算法
  if (h >= 330 || h <= 60) {
    // 红色到黄色范围 - 暖色
    if (s < 0.3) {
      // 低饱和度区域使用加权判断
      return rWeight > bWeight + 0.05 ? 'warm' : 'cold'
    }
    return 'warm'
  } else if (h >= 140 && h <= 280) {
    // 青色到蓝色范围 - 冷色
    if (s < 0.3) {
      // 低饱和度区域使用加权判断
      return bWeight > rWeight + 0.05 ? 'cold' : 'warm'
    }
    return 'cold'
  } else {
    // 中间区域使用RGB加权值判定
    const warmScore = rWeight * 0.7 + gWeight * 0.3
    const coldScore = bWeight * 0.85 + gWeight * 0.2

    // 自适应阈值
    const threshold = 0.5 + (s - 0.5) * 0.2
    return warmScore > coldScore + threshold ? 'warm' : 'cold'
  }
}

export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) hex = hex.replace(/./g, '$&$&')

  const values = hex.match(/.{2}/g) || ['0', '0', '0']

  return {
    r: parseInt(values[0], 16),
    g: parseInt(values[1], 16),
    b: parseInt(values[2], 16),
  }
}
