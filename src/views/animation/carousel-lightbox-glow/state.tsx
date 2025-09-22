import React from 'react'

export const usePageState = () => {
  const init = () => {
    const carousel = document.getElementById('carousel')
    const numCards = 6
    const angleStep = 360 / numCards
    const radius = 180

    const items = [
      // { src: 'https://iili.io/3MFDjiG.jpg', caption: '' }, 
      { src: '/image/natural-scenery/1.png', caption: '' }, 
      // { src: 'https://iili.io/3MFDNff.jpg', caption: '' },
      { src: '/image/natural-scenery/2.png', caption: '' }, 
      // { src: 'https://iili.io/3MFDOl4.jpg', caption: '' },
      { src: '/image/natural-scenery/3.png', caption: '' }, 
      // { src: 'https://iili.io/3MFDhVs.jpg', caption: '' },
      { src: '/image/natural-scenery/4.png', caption: '' }, 
      // { src: 'https://iili.io/3MFD4Wu.jpg', caption: '' },
      { src: '/image/natural-scenery/5.png', caption: '' }, 
      // { src: 'https://iili.io/3MFDrxe.jpg', caption: '' },
      { src: '/image/natural-scenery/6.png', caption: '' }, 
    ]

    items.forEach((item, i) => {
      const card = document.createElement('div')
      card.className = 'card'
      card.style.transform = `rotateX(${
        i * angleStep
      }deg) translateZ(${radius}px)`
      card.style.backgroundImage = `url('${item.src}')`
      card.addEventListener('click', () => openLightbox(item.src))

      const caption = document.createElement('div')
      caption.className = 'caption'
      caption.innerText = item.caption
      card.appendChild(caption)

      carousel.appendChild(card)
    })

    // auto rotation stop mouseover
    carousel.addEventListener('mouseover', () => {
      clearInterval(rotationInterval)
    })

    // auto rotation start mouseout
    carousel.addEventListener('mouseout', () => {
      rotationInterval = setInterval(() => {
        currentRotation += angleStep
        carousel.style.transform = `rotateX(${currentRotation}deg)`
      }, 3000)
    })

    // auto rotation
    let rotationInterval = setInterval(() => {
      currentRotation += angleStep
      carousel.style.transform = `rotateX(${currentRotation}deg)`
    }, 3000)

    // ROTATION
    let startY
    let currentRotation = 0
    document.addEventListener('mousedown', (e) => {
      startY = e.clientY
      document.onmousemove = (e) => {
        const deltaY = e.clientY - startY
        startY = e.clientY
        currentRotation += deltaY * 0.5
        carousel.style.transform = `rotateX(${currentRotation}deg)`
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    })

    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY
    })

    document.addEventListener('touchmove', (e) => {
      const deltaY = e.touches[0].clientY - startY
      startY = e.touches[0].clientY
      currentRotation += deltaY * 0.5
      carousel.style.transform = `rotateX(${currentRotation}deg)`
    })

    // LIGHTBOX
    const lightbox = document.getElementById('lightbox')
    const lightboxImg = document.getElementById('lightboxImg')
    const closeBtn = document.getElementById('closeBtn')

    function openLightbox(src) {
      lightboxImg.src = src
      lightbox.classList.add('active')
    }

    function closeLightbox() {
      lightbox.classList.remove('active')
      setTimeout(() => {
        lightboxImg.src = ''
      }, 300)
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === closeBtn) {
        closeLightbox()
      }
    })
  }

  React.useEffect(init, [])
}
