import React from 'react'
import {
  hexToOklchString,
  hexToRgbString,
  generatePalette,
  isLight,
} from './utils'

export const usePageState = () => {
  const setBG = (query: string, color: string) => {
    const dom: HTMLElement | null = document.querySelector(query)
    if (dom) dom.style.background = color
  }
  const init = () => {
    // --- Apply Palette to page ---
    const baseColorDom: HTMLInputElement | null = document.getElementById(
      'baseColor',
    ) as HTMLInputElement
    if (!baseColorDom) return
    function applyPalette() {
      if (!baseColorDom) return
      const baseHex = baseColorDom.value
      const palette = generatePalette(baseHex)

      // --- Body & hero ---
      // document.body.style.background = palette.mainColor
      setBG('.animation__change-color', palette.mainColor)

      // document.querySelector('.hero').style.background = palette.secondaryColor
      setBG('.hero', palette.secondaryColor)

      // --- Menu links ---
      document.querySelectorAll('.menu-item').forEach((item) => {
        const link = item.querySelector('a')
        if (!link) return
        link.style.color = item.classList.contains('selected')
          ? palette.secondaryColor
          : palette.textColor
        link.style.background = palette.mainColor
      })

      // --- Boxes ---
      const boxes = [
        { id: 'box1', color: palette.box1Color },
        { id: 'box2', color: palette.box2Color },
        { id: 'box3', color: palette.box3Color },
      ]
      // Color Boxes
      boxes.forEach((b) => {
        const el = document.getElementById(b.id)
        if (!el) return
        el.style.background = b.color
        el.innerHTML =
          b.color +
          '<br>' +
          hexToRgbString(b.color) +
          '<br>' +
          hexToOklchString(b.color)
        el.style.color = isLight(b.color) ? 'black' : 'white'
      })

      // --- Show Selected & Menu Colors ---
      document.getElementById('selectedColor')!.innerHTML =
        palette.mainColor +
        '<br>' +
        hexToRgbString(palette.mainColor) +
        '<br>' +
        hexToOklchString(palette.mainColor)

      document.getElementById('menuColor')!.innerHTML =
        'secondary color:<br>' +
        palette.secondaryColor +
        '<br>' +
        hexToRgbString(palette.secondaryColor) +
        '<br>' +
        hexToOklchString(palette.secondaryColor)
    }
    applyPalette()
    // document.getElementById('baseColor').addEventListener('input', applyPalette)
    baseColorDom.addEventListener('input', applyPalette)
  }

  React.useEffect(init, [])
}
