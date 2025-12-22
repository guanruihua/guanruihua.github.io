// --- HEX <-> HSL Utilities --- light/dark stuff
export function hexToHSL(hex: string) {
  let r = parseInt(hex.substr(1, 2), 16) / 255
  let g = parseInt(hex.substr(3, 2), 16) / 255
  let b = parseInt(hex.substr(5, 2), 16) / 255
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h: number = 0,
    s,
    l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function hslToHex(hsl: any) {
  let { h, s, l } = hsl
  h /= 360
  s /= 100
  l /= 100
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return (
    '#' +
    [r, g, b]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  )
}
// --- HEX to RGB --- because even though it says RGB numbers in picker, it is HEX
export function hexToRgbString(hex: string) {
  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)
  return `rgb(${r}, ${g}, ${b})`
}

/*just to print the OKLCH text color*/
// --- HEX to OKLCH ---//

export function hexToOklchString(hex: string) {
  // --- Convert hex to 0–1 RGB ---
  const r = parseInt(hex.substr(1, 2), 16) / 255
  const g = parseInt(hex.substr(3, 2), 16) / 255
  const b = parseInt(hex.substr(5, 2), 16) / 255

  // --- sRGB → linear ---
  const lr = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  const lg = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  const lb = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

  // --- Linear RGB → OKLab ---
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb
  // -- now it's time to cube square roots--
  const L =
    0.2104542553 * Math.cbrt(l_) +
    0.793617785 * Math.cbrt(m_) -
    0.0040720468 * Math.cbrt(s_)
  const a =
    1.9779984951 * Math.cbrt(l_) -
    2.428592205 * Math.cbrt(m_) +
    0.4505937099 * Math.cbrt(s_)
  const b_ =
    0.0259040371 * Math.cbrt(l_) +
    0.7827717662 * Math.cbrt(m_) -
    0.808675766 * Math.cbrt(s_)

  const C = Math.sqrt(a * a + b_ * b_)
  const h = ((Math.atan2(b_, a) * 180) / Math.PI + 360) % 360

  // --- Return raw values like the OKLab site ---
  return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${h.toFixed(2)})`
}

// --- Lightness check ---
export function isLight(hex: string) {
  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}

// --- Generate Palette ---
export function generatePalette(baseHex: any) {
  const baseHSL = hexToHSL(baseHex)

  // --- Grayscale mode --- so it would stop giving red to my color in my black/white palette
  if (baseHSL.s === 0) {
    const mainColor = baseHex
    const secondaryColor = hslToHex({ h: 0, s: 0, l: 50 }) // medium gray
    const box1Color = hslToHex({ h: 0, s: 0, l: 25 }) // dark gray
    const box2Color = hslToHex({ h: 0, s: 0, l: 75 }) // light gray
    const box3Color = hslToHex({ h: 0, s: 0, l: 90 }) // very light gray
    const textColor = isLight(mainColor) ? 'black' : '#d4d4d4'
    return {
      mainColor,
      secondaryColor,
      box1Color,
      box2Color,
      box3Color,
      textColor,
    }
  }

  // --- Color palette --- This is my no means done right - its just looked less bad than my other trys
  const baseS = Math.max(baseHSL.s, 30) // ensure saturation is at least 20%
  const mainColor = baseHex
  const secondaryColor = hslToHex({ h: baseHSL.h, s: baseS * 0.6, l: 85 })
  const box1Color = hslToHex({ h: baseHSL.h, s: baseS * 0.9, l: 70 })
  const box2Color = hslToHex({ h: baseHSL.h, s: baseS, l: 50 })
  const box3Color = hslToHex({ h: baseHSL.h, s: baseS * 0.8, l: 30 })
  const textColor = isLight(mainColor) ? 'black' : '#d4d4d4'
  return {
    mainColor,
    secondaryColor,
    box1Color,
    box2Color,
    box3Color,
    textColor,
  }
}
