export class CardStreamController {
  container = document.getElementById('cardStream') || null
  cardLine = document.getElementById('cardLine') || null
  speedIndicator = document.getElementById('speedValue') || null
  position = 0
  velocity = 120
  direction = -1
  isAnimating = true
  isDragging = false
  lastTime = 0
  lastMouseX = 0
  mouseVelocity = 0
  friction = 0.95
  minVelocity = 30
  containerWidth = 0
  cardLineWidth = 0

  constructor() {
    this.container = document.getElementById('cardStream')
    this.cardLine = document.getElementById('cardLine')
    this.speedIndicator = document.getElementById('speedValue')

    this.position = 0
    this.velocity = 120
    this.direction = -1
    this.isAnimating = true
    this.isDragging = false

    this.lastTime = 0
    this.lastMouseX = 0
    this.mouseVelocity = 0
    this.friction = 0.95
    this.minVelocity = 30

    this.containerWidth = 0
    this.cardLineWidth = 0

    this.init()
  }

  init() {
    this.populateCardLine()
    this.calculateDimensions()
    this.setupEventListeners()
    this.updateCardPosition()
    this.animate()
    this.startPeriodicUpdates()
  }

  calculateDimensions() {
    this.containerWidth = this.container.offsetWidth
    const cardWidth = 400
    const cardGap = 60
    const cardCount = this.cardLine.children.length
    this.cardLineWidth = (cardWidth + cardGap) * cardCount
  }

  setupEventListeners() {
    this.cardLine.addEventListener('mousedown', (e) => this.startDrag(e))
    document.addEventListener('mousemove', (e) => this.onDrag(e))
    document.addEventListener('mouseup', () => this.endDrag())

    this.cardLine.addEventListener(
      'touchstart',
      (e) => this.startDrag(e.touches[0]),
      { passive: false },
    )
    document.addEventListener('touchmove', (e) => this.onDrag(e.touches[0]), {
      passive: false,
    })
    document.addEventListener('touchend', () => this.endDrag())

    this.cardLine.addEventListener('wheel', (e) => this.onWheel(e))
    this.cardLine.addEventListener('selectstart', (e) => e.preventDefault())
    this.cardLine.addEventListener('dragstart', (e) => e.preventDefault())

    window.addEventListener('resize', () => this.calculateDimensions())
  }

  startDrag(e) {
    e.preventDefault()

    this.isDragging = true
    this.isAnimating = false
    this.lastMouseX = e.clientX
    this.mouseVelocity = 0

    const transform = window.getComputedStyle(this.cardLine).transform
    if (transform !== 'none') {
      const matrix = new DOMMatrix(transform)
      this.position = matrix.m41
    }

    this.cardLine.style.animation = 'none'
    this.cardLine.classList.add('dragging')

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
  }

  onDrag(e) {
    if (!this.isDragging) return
    e.preventDefault()

    const deltaX = e.clientX - this.lastMouseX
    this.position += deltaX
    this.mouseVelocity = deltaX * 60
    this.lastMouseX = e.clientX

    this.cardLine.style.transform = `translateX(${this.position}px)`
    this.updateCardClipping()
  }

  endDrag() {
    if (!this.isDragging) return

    this.isDragging = false
    this.cardLine.classList.remove('dragging')

    if (Math.abs(this.mouseVelocity) > this.minVelocity) {
      this.velocity = Math.abs(this.mouseVelocity)
      this.direction = this.mouseVelocity > 0 ? 1 : -1
    } else {
      this.velocity = 120
    }

    this.isAnimating = true
    this.updateSpeedIndicator()

    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }

  animate() {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    if (this.isAnimating && !this.isDragging) {
      if (this.velocity > this.minVelocity) {
        this.velocity *= this.friction
      } else {
        this.velocity = Math.max(this.minVelocity, this.velocity)
      }

      this.position += this.velocity * this.direction * deltaTime
      this.updateCardPosition()
      this.updateSpeedIndicator()
    }

    requestAnimationFrame(() => this.animate())
  }

  updateCardPosition() {
    const containerWidth = this.containerWidth
    const cardLineWidth = this.cardLineWidth

    if (this.position < -cardLineWidth) {
      this.position = containerWidth
    } else if (this.position > containerWidth) {
      this.position = -cardLineWidth
    }

    this.cardLine.style.transform = `translateX(${this.position}px)`
    this.updateCardClipping()
  }

  updateSpeedIndicator() {
    this.speedIndicator.textContent = Math.round(this.velocity)
  }

  toggleAnimation() {
    this.isAnimating = !this.isAnimating
    const btn = document.querySelector('.control-btn')
    btn.textContent = this.isAnimating ? '⏸️ Pause' : '▶️ Play'

    if (this.isAnimating) {
      this.cardLine.style.animation = 'none'
    }
  }

  resetPosition() {
    this.position = this.containerWidth
    this.velocity = 120
    this.direction = -1
    this.isAnimating = true
    this.isDragging = false

    this.cardLine.style.animation = 'none'
    this.cardLine.style.transform = `translateX(${this.position}px)`
    this.cardLine.classList.remove('dragging')

    this.updateSpeedIndicator()

    const btn = document.querySelector('.control-btn')
    btn.textContent = '⏸️ Pause'
  }

  changeDirection() {
    this.direction *= -1
    this.updateSpeedIndicator()
  }

  onWheel(e) {
    e.preventDefault()

    const scrollSpeed = 20
    const delta = e.deltaY > 0 ? scrollSpeed : -scrollSpeed

    this.position += delta
    this.updateCardPosition()
    this.updateCardClipping()
  }

  generateCode(width: number, height: number) {
    const randInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min
    const pick = (arr: any[]) => arr[randInt(0, arr.length - 1)]

    const header = [
      '// compiled preview • scanner demo',
      '/* generated for visual effect – not executed */',
      'const SCAN_WIDTH = 8;',
      'const FADE_ZONE = 35;',
      'const MAX_PARTICLES = 2500;',
      'const TRANSITION = 0.05;',
    ]

    const helpers = [
      'function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }',
      'function lerp(a, b, t) { return a + (b - a) * t; }',
      'const now = () => performance.now();',
      'function rng(min, max) { return Math.random() * (max - min) + min; }',
    ]

    const particleBlock = (idx: string) => [
      `class Particle${idx} {`,
      '  constructor(x, y, vx, vy, r, a) {',
      '    this.x = x; this.y = y;',
      '    this.vx = vx; this.vy = vy;',
      '    this.r = r; this.a = a;',
      '  }',
      '  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }',
      '}',
    ]

    const scannerBlock = [
      'const scanner = {',
      '  x: Math.floor(window.innerWidth / 2),',
      '  width: SCAN_WIDTH,',
      '  glow: 3.5,',
      '};',
      '',
      'function drawParticle(ctx, p) {',
      '  ctx.globalAlpha = clamp(p.a, 0, 1);',
      '  ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);',
      '}',
    ]

    const loopBlock = [
      'function tick(t) {',
      '  // requestAnimationFrame(tick);',
      '  const dt = 0.016;',
      '  // update & render',
      '}',
    ]

    const misc = [
      'const state = { intensity: 1.2, particles: MAX_PARTICLES };',
      'const bounds = { w: window.innerWidth, h: 300 };',
      "const gradient = document.createElement('canvas');",
      "const ctx = gradient.getContext('2d');",
      "ctx.globalCompositeOperation = 'lighter';",
      '// ascii overlay is masked with a 3-phase gradient',
    ]

    const library = []
    header.forEach((l) => library.push(l))
    helpers.forEach((l) => library.push(l))
    for (let b = 0; b < 3; b++) particleBlock(b).forEach((l) => library.push(l))
    scannerBlock.forEach((l) => library.push(l))
    loopBlock.forEach((l) => library.push(l))
    misc.forEach((l) => library.push(l))

    for (let i = 0; i < 40; i++) {
      const n1 = randInt(1, 9)
      const n2 = randInt(10, 99)
      library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)};`)
    }
    for (let i = 0; i < 20; i++) {
      library.push(
        `if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; }`,
      )
    }

    let flow = library.join(' ')
    flow = flow.replace(/\s+/g, ' ').trim()
    const totalChars = width * height
    while (flow.length < totalChars + width) {
      const extra = pick(library).replace(/\s+/g, ' ').trim()
      flow += ' ' + extra
    }

    let out = ''
    let offset = 0
    for (let row = 0; row < height; row++) {
      let line = flow.slice(offset, offset + width)
      if (line.length < width) line = line + ' '.repeat(width - line.length)
      out += line + (row < height - 1 ? '\n' : '')
      offset += width
    }
    return out
  }

  calculateCodeDimensions(cardWidth, cardHeight) {
    const fontSize = 11
    const lineHeight = 13
    const charWidth = 6
    const width = Math.floor(cardWidth / charWidth)
    const height = Math.floor(cardHeight / lineHeight)
    return { width, height, fontSize, lineHeight }
  }

  createCardWrapper(index) {
    const wrapper = document.createElement('div')
    wrapper.className = 'card-wrapper'

    const normalCard = document.createElement('div')
    normalCard.className = 'card card-normal'

    const cardImages = [
      'https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png',
      'https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png',
      'https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png',
      'https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png',
      'https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png',
    ]

    const cardImage = document.createElement('img')
    cardImage.className = 'card-image'
    cardImage.src = cardImages[index % cardImages.length]
    cardImage.alt = 'Credit Card'

    cardImage.onerror = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 250
      const ctx = canvas.getContext('2d')

      const gradient = ctx.createLinearGradient(0, 0, 400, 250)
      gradient.addColorStop(0, '#667eea')
      gradient.addColorStop(1, '#764ba2')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 400, 250)

      cardImage.src = canvas.toDataURL()
    }

    normalCard.appendChild(cardImage)

    const asciiCard = document.createElement('div')
    asciiCard.className = 'card card-ascii'

    const asciiContent = document.createElement('div')
    asciiContent.className = 'ascii-content'

    const { width, height, fontSize, lineHeight } =
      this.calculateCodeDimensions(400, 250)
    asciiContent.style.fontSize = fontSize + 'px'
    asciiContent.style.lineHeight = lineHeight + 'px'
    asciiContent.textContent = this.generateCode(width, height)

    asciiCard.appendChild(asciiContent)
    wrapper.appendChild(normalCard)
    wrapper.appendChild(asciiCard)

    return wrapper
  }

  updateCardClipping() {
    const scannerX = window.innerWidth / 2
    const scannerWidth = 8
    const scannerLeft = scannerX - scannerWidth / 2
    const scannerRight = scannerX + scannerWidth / 2
    let anyScanningActive = false

    document.querySelectorAll('.card-wrapper').forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect()
      const cardLeft = rect.left
      const cardRight = rect.right
      const cardWidth = rect.width

      const normalCard = wrapper.querySelector('.card-normal')
      const asciiCard = wrapper.querySelector('.card-ascii')

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        anyScanningActive = true
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0)
        const scannerIntersectRight = Math.min(
          scannerRight - cardLeft,
          cardWidth,
        )

        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100
        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100

        normalCard.style.setProperty('--clip-right', `${normalClipRight}%`)
        asciiCard.style.setProperty('--clip-left', `${asciiClipLeft}%`)

        if (!wrapper.hasAttribute('data-scanned') && scannerIntersectLeft > 0) {
          wrapper.setAttribute('data-scanned', 'true')
          const scanEffect = document.createElement('div')
          scanEffect.className = 'scan-effect'
          wrapper.appendChild(scanEffect)
          setTimeout(() => {
            if (scanEffect.parentNode) {
              scanEffect.parentNode.removeChild(scanEffect)
            }
          }, 600)
        }
      } else {
        if (cardRight < scannerLeft) {
          normalCard.style.setProperty('--clip-right', '100%')
          asciiCard.style.setProperty('--clip-left', '100%')
        } else if (cardLeft > scannerRight) {
          normalCard.style.setProperty('--clip-right', '0%')
          asciiCard.style.setProperty('--clip-left', '0%')
        }
        wrapper.removeAttribute('data-scanned')
      }
    })

    if (window.setScannerScanning) {
      window.setScannerScanning(anyScanningActive)
    }
  }

  updateAsciiContent() {
    document.querySelectorAll('.ascii-content').forEach((content) => {
      if (Math.random() < 0.15) {
        const { width, height } = this.calculateCodeDimensions(400, 250)
        content.textContent = this.generateCode(width, height)
      }
    })
  }

  populateCardLine() {
    this.cardLine.innerHTML = ''
    const cardsCount = 30
    for (let i = 0; i < cardsCount; i++) {
      const cardWrapper = this.createCardWrapper(i)
      this.cardLine.appendChild(cardWrapper)
    }
  }

  startPeriodicUpdates() {
    setInterval(() => {
      this.updateAsciiContent()
    }, 200)

    const updateClipping = () => {
      this.updateCardClipping()
      requestAnimationFrame(updateClipping)
    }
    updateClipping()
  }
}
