import React from 'react'

export const usePageState = () => {
  const init = () => {
    function createParticles(containerId, count, particleClass = 'particle') {
      const container = document.getElementById(containerId)
      if (!container) return

      const frag = document.createDocumentFragment()

      for (let i = 0; i < count; i++) {
        const p = document.createElement('div')
        p.classList.add(particleClass)
        p.style.animationDelay = `${Math.random().toFixed(2)}s`
        p.style.left = `calc((100% - 2.5em) * ${i / count})`
        frag.appendChild(p)
      }

      container.appendChild(frag)
    }

    createParticles('fire-container', 50)
    createParticles('fire-container-2', 50)
    createParticles('fire-container-3', 50, 'particle-2')
  }

  React.useEffect(init, [])
}
