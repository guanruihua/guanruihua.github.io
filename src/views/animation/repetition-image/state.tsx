import React from 'react'
import { useLoadJS } from '@/hook'

export const usePageState = () => {
  const init = () => {
    class ImageHover {
      DOM = {
        el: null,
        innerElems: null,
        debugPanel: null,
        cursorDrag: null,
      }

      bgImage
      currentShape = 'rectangle'
      currentEffect = 'stroke'

      duration = 0.8
      ease = 'power2.inOut'
      scaleInterval = 0.06
      rotationInterval = 15
      parallaxStrength = 20
      innerTotal = 10
      shapeSize = 45
      transformOrigin = '50% 50%'

      mouseX = 0
      mouseY = 0
      centerX = 0
      centerY = 0
      isHovered = false

      isDragging = false
      dragStartY = 0
      dragDistance = 0
      smoothDragDistance = 0
      isRotationActive = false

      currentRotation = 0
      currentScale = 1
      layerOutlines = []
      layerShadows = []

      dragLerpFactor = 0.1

      animationFrame = null
      hoverTimeline = null
      isTransitioning = false

      constructor(DOM_el:any) {
        this.DOM = {
          el: DOM_el,
          debugPanel: document.getElementById('debugPanel'),
          cursorDrag: document.getElementById('cursorDrag'),
        }

        this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(
          this.DOM.el.style.backgroundImage,
        )[1]

        gsap.set(this.DOM.el, { backgroundImage: 'none' })
        this.createLayers()
        gsap.set(this.DOM.el, { transformOrigin: this.transformOrigin })
        this.createLayerOutlines()
        this.createHoverTimeline()
        this.initEvents()
        this.initShapeControls()
        this.initEffectControls()
        this.startAnimationLoop()
      }

      createLayers() {
        let innerHTML = ''
        for (let i = 0; i < this.innerTotal; i++) {
          const shapeClass = i === 0 ? 'rectangle' : this.currentShape
          const baseClass = i === 0 ? 'base-layer' : ''
          innerHTML += `<div class="image__element ${shapeClass} ${baseClass}" style="background-image:url(${this.bgImage})" data-layer="${i}"></div>`
        }

        this.DOM.el.innerHTML = innerHTML
        this.DOM.innerElems = this.DOM.el.querySelectorAll('.image__element')
        this.updateCenter()
      }

      updateCenter() {
        const rect = this.DOM.el.getBoundingClientRect()
        this.centerX = rect.left + rect.width / 2
        this.centerY = rect.top + rect.height / 2
      }

      createLayerOutlines() {
        this.layerOutlines.forEach((outline) => {
          if (outline.parentNode) {
            outline.parentNode.removeChild(outline)
          }
        })
        this.layerOutlines = []

        this.layerShadows.forEach((shadow) => {
          if (shadow.parentNode) {
            shadow.parentNode.removeChild(shadow)
          }
        })
        this.layerShadows = []

        this.DOM.innerElems.forEach((elem, index) => {
          if (index === 0) return

          const existingOutline = elem.querySelector('.layer-outline')
          const existingShadow = elem.querySelector('.layer-shadow')
          if (existingOutline) existingOutline.remove()
          if (existingShadow) existingShadow.remove()

          const outlineElement = document.createElement('div')
          outlineElement.className = 'layer-outline'
          outlineElement.setAttribute('data-layer', index)

          const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
          )
          svg.setAttribute('viewBox', '0 0 100 100')
          svg.setAttribute('preserveAspectRatio', 'none')

          const path = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path',
          )

          const pathData = this.getLayerShapePath(index)
          path.setAttribute('d', pathData)
          path.setAttribute('stroke', '#ffffff')
          path.setAttribute('stroke-width', '1')
          path.setAttribute('fill', 'none')
          path.setAttribute('vector-effect', 'non-scaling-stroke')
          path.style.filter = 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))'

          svg.appendChild(path)
          outlineElement.appendChild(svg)

          const shadowElement = document.createElement('div')
          shadowElement.className = 'layer-shadow'
          shadowElement.setAttribute('data-layer', index)

          const shadowSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
          )
          shadowSvg.setAttribute('viewBox', '0 0 100 100')
          shadowSvg.setAttribute('preserveAspectRatio', 'none')

          for (let shadowLayer = 0; shadowLayer < 3; shadowLayer++) {
            const shadowPath = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'path',
            )
            const pathData = this.getLayerShapePath(index)
            shadowPath.setAttribute('d', pathData)

            const alpha = 0.4 - shadowLayer * 0.08
            const strokeWidth = 3 - shadowLayer * 0.8
            shadowPath.setAttribute('fill', 'none')
            shadowPath.setAttribute('stroke', `rgba(0, 0, 0, ${alpha})`)
            shadowPath.setAttribute('stroke-width', strokeWidth)
            shadowPath.setAttribute('vector-effect', 'non-scaling-stroke')

            shadowSvg.appendChild(shadowPath)
          }

          shadowElement.appendChild(shadowSvg)

          elem.appendChild(outlineElement)
          elem.appendChild(shadowElement)

          this.layerOutlines.push(outlineElement)
          this.layerShadows.push(shadowElement)
        })
      }

      getLayerShapePath(layerIndex) {
        switch (this.currentShape) {
          case 'rectangle':
            return `M 0 0 L 100 0 L 100 100 L 0 100 Z`
          case 'triangle':
            return `M 50 5 L 10 95 L 90 95 Z`
          case 'chevron':
            return `M 75 0 L 100 50 L 75 100 L 0 100 L 25 50 L 0 0 Z`
          case 'oval':
            return `M 50 15 C 74.85 15 95 31.32 95 50 C 95 68.68 74.85 85 50 85 C 25.15 85 5 68.68 5 50 C 5 31.32 25.15 15 50 15 Z`
          default:
            return ''
        }
      }

      startAnimationLoop() {
        const animate = () => {
          this.smoothDragDistance +=
            (this.dragDistance - this.smoothDragDistance) * this.dragLerpFactor

          if (this.isHovered && !this.isTransitioning) {
            if (this.isRotationActive) {
              this.updateDragRotation()
              this.updateLayerOutlines()
            } else if (!this.isDragging) {
              this.updateParallax()
              this.updateLayerOutlines()
            }
          }

          this.updateDebugInfo()
          this.animationFrame = requestAnimationFrame(animate)
        }
        animate()
      }

      updateParallax() {
        const deltaX =
          (this.mouseX - this.centerX) / (this.DOM.el.offsetWidth / 2)
        const deltaY =
          (this.mouseY - this.centerY) / (this.DOM.el.offsetHeight / 2)

        this.DOM.innerElems.forEach((elem, index) => {
          if (index === 0) return

          const layerMultiplier = index * 0.2
          const parallaxX =
            deltaX * this.parallaxStrength * layerMultiplier * 0.5
          const parallaxY =
            deltaY * this.parallaxStrength * layerMultiplier * 0.5

          gsap.set(elem, {
            x: parallaxX,
            y: parallaxY,
            z: index * 10,
            transformPerspective: 1000,
          })
        })
      }

      updateDragRotation() {
        const rotationProgress = Math.min(
          Math.abs(this.smoothDragDistance) / 100,
          1,
        )

        this.DOM.innerElems.forEach((elem, index) => {
          if (index === 0) return

          const baseRotation = (this.smoothDragDistance / 2) * rotationProgress
          const layerRotation = baseRotation * (index * 0.3)

          const deltaX =
            (this.mouseX - this.centerX) / (this.DOM.el.offsetWidth / 2)
          const deltaY =
            (this.mouseY - this.centerY) / (this.DOM.el.offsetHeight / 2)

          const layerMultiplier = index * 0.3
          const parallaxX = deltaX * this.parallaxStrength * layerMultiplier
          const parallaxY = deltaY * this.parallaxStrength * layerMultiplier

          gsap.set(elem, {
            x: parallaxX,
            y: parallaxY,
            z: index * 15,
            rotationX: deltaY * 15 * rotationProgress,
            rotationY: deltaX * -15 * rotationProgress,
            rotationZ: layerRotation,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
          })
        })

        this.currentRotation = this.smoothDragDistance / 2
        this.currentScale = 1 + Math.abs(rotationProgress) * 2
      }

      updateLayerOutlines() {
        this.updateEffectVisibility()
      }

      updateDebugInfo() {
        if (!this.DOM.debugPanel) return

        const rotationInfo = this.DOM.debugPanel.querySelector('#rotationInfo')
        const scaleInfo = this.DOM.debugPanel.querySelector('#scaleInfo')
        const edgesInfo = this.DOM.debugPanel.querySelector('#edgesInfo')

        if (rotationInfo) {
          rotationInfo.textContent = `rotation: ${this.currentRotation.toFixed(
            1,
          )}`
        }
        if (scaleInfo) {
          scaleInfo.textContent = `scale: ${this.currentScale.toFixed(1)}`
        }
        if (edgesInfo) {
          const edges = this.getShapeEdgeCount()
          edgesInfo.textContent = `edges: ${edges.toFixed(1)}`
        }
      }

      getShapeEdgeCount() {
        switch (this.currentShape) {
          case 'rectangle':
            return 4
          case 'triangle':
            return 3
          case 'chevron':
            return 6
          case 'oval':
            return 0
          default:
            return 0
        }
      }

      applyCurrentShape() {
        this.DOM.innerElems.forEach((elem, index) => {
          if (index === 0) return

          elem.classList.remove('rectangle', 'triangle', 'chevron', 'oval')
          elem.classList.add(this.currentShape)
        })

        this.createLayerOutlines()
      }

      initShapeControls() {
        const shapeButtons = document.querySelectorAll('.shape-btn')

        shapeButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const newShape = btn.dataset.shape
            if (newShape !== this.currentShape && !this.isTransitioning) {
              this.changeShape(newShape)

              shapeButtons.forEach((b) => b.classList.remove('active'))
              btn.classList.add('active')
            }
          })
        })
      }

      initEffectControls() {
        const effectButtons = document.querySelectorAll('.effect-btn')

        effectButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const newEffect = btn.dataset.effect
            if (newEffect !== this.currentEffect && !this.isTransitioning) {
              this.changeEffect(newEffect)

              effectButtons.forEach((b) => b.classList.remove('active'))
              btn.classList.add('active')
            }
          })
        })
      }

      changeEffect(newEffect) {
        this.currentEffect = newEffect
        this.updateEffectVisibility()
      }

      updateEffectVisibility() {
        this.layerOutlines.forEach((outline) => {
          if (this.currentEffect === 'stroke' && this.isRotationActive) {
            outline.classList.add('active')
          } else {
            outline.classList.remove('active')
          }
        })

        this.layerShadows.forEach((shadow) => {
          if (this.currentEffect === 'shade' && this.isRotationActive) {
            shadow.classList.add('active')
          } else {
            shadow.classList.remove('active')
          }
        })
      }

      changeShape(newShape) {
        if (this.isTransitioning) return

        this.isTransitioning = true

        const resetPromise = new Promise((resolve) => {
          if (this.hoverTimeline) {
            this.hoverTimeline.pause()
          }

          gsap.to(this.DOM.innerElems, {
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: resolve,
          })

          this.isRotationActive = false
          this.DOM.el.classList.remove('rotation-active')
          this.dragDistance = 0
          this.smoothDragDistance = 0
          this.currentRotation = 0
          this.currentScale = 1

          this.layerOutlines.forEach((outline) => {
            outline.classList.remove('active')
          })

          this.layerShadows.forEach((shadow) => {
            shadow.classList.remove('active')
          })
        })

        resetPromise.then(() => {
          this.currentShape = newShape
          this.applyCurrentShape()
          this.createHoverTimeline()

          if (this.isHovered) {
            this.hoverTimeline.play()
          }

          this.isTransitioning = false
        })
      }

      createHoverTimeline() {
        const getScaleValue = (i) => {
          let scaleValue = 1 - this.scaleInterval * i
          return scaleValue >= 0 ? scaleValue : 0
        }

        if (this.hoverTimeline) {
          this.hoverTimeline.kill()
        }

        const reversedElements = Array.from(this.DOM.innerElems).reverse()

        this.hoverTimeline = gsap
          .timeline({ paused: true })
          .to(reversedElements, {
            scale: (i, target) => {
              const originalIndex = Array.from(this.DOM.innerElems).indexOf(
                target,
              )
              return getScaleValue(originalIndex)
            },
            duration: this.duration,
            ease: this.ease,
            stagger: 0.1,
          })
      }

      initEvents() {
        this.DOM.el.addEventListener('mouseenter', () => {
          if (this.isTransitioning) return

          this.isHovered = true
          this.updateCenter()
          this.hoverTimeline.play()

          if (this.DOM.cursorDrag) {
            this.DOM.cursorDrag.style.opacity = '1'
          }
        })

        this.DOM.el.addEventListener('mouseleave', () => {
          this.isHovered = false
          if (!this.isTransitioning) {
            this.hoverTimeline.reverse()
          }
          this.resetTransforms()

          if (this.DOM.cursorDrag) {
            this.DOM.cursorDrag.style.opacity = '0'
          }
        })

        this.DOM.el.addEventListener('mousemove', (e) => {
          this.mouseX = e.clientX
          this.mouseY = e.clientY

          if (this.DOM.cursorDrag) {
            this.DOM.cursorDrag.style.left = e.clientX + 'px'
            this.DOM.cursorDrag.style.top = e.clientY + 'px'
          }
        })

        document.addEventListener('mousemove', (e) => {
          if (this.DOM.cursorDrag && this.isHovered) {
            this.DOM.cursorDrag.style.left = e.clientX + 'px'
            this.DOM.cursorDrag.style.top = e.clientY + 'px'
          }
        })

        this.DOM.el.addEventListener('mousedown', (e) => {
          if (this.isTransitioning) return

          this.isDragging = true
          this.dragStartY = e.clientY
          this.DOM.el.classList.add('dragging')

          if (this.DOM.cursorDrag) {
            this.DOM.cursorDrag.classList.add('hide-up')
          }

          e.preventDefault()
        })

        document.addEventListener('mousemove', (e) => {
          if (this.isDragging && !this.isTransitioning) {
            this.dragDistance = e.clientY - this.dragStartY

            if (Math.abs(this.dragDistance) > 30 && !this.isRotationActive) {
              this.isRotationActive = true
              this.DOM.el.classList.add('rotation-active')
            }
          }
        })

        document.addEventListener('mouseup', () => {
          if (this.isDragging) {
            this.isDragging = false
            this.DOM.el.classList.remove('dragging')

            if (this.DOM.cursorDrag && this.isHovered) {
              this.DOM.cursorDrag.classList.remove('hide-up')
            }

            gsap.to(this, {
              dragDistance: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
          }
        })

        window.addEventListener('resize', () => {
          this.updateCenter()
          this.createLayerOutlines()
        })

        this.DOM.el.addEventListener('touchstart', (e) => {
          if (this.isTransitioning) return

          this.isDragging = true
          this.dragStartY = e.touches[0].clientY
          this.DOM.el.classList.add('dragging')
          e.preventDefault()
        })

        document.addEventListener('touchmove', (e) => {
          if (this.isDragging && !this.isTransitioning) {
            this.dragDistance = e.touches[0].clientY - this.dragStartY

            if (Math.abs(this.dragDistance) > 30 && !this.isRotationActive) {
              this.isRotationActive = true
              this.DOM.el.classList.add('rotation-active')
            }
          }
        })

        document.addEventListener('touchend', () => {
          if (this.isDragging) {
            this.isDragging = false
            this.DOM.el.classList.remove('dragging')

            gsap.to(this, {
              dragDistance: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
          }
        })
      }

      resetTransforms() {
        this.DOM.innerElems.forEach((elem, index) => {
          if (index === 0) return
          gsap.to(elem, {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 0.6,
            ease: 'power2.out',
          })
        })

        gsap.to(this, {
          smoothDragDistance: 0,
          duration: 0.6,
          ease: 'power2.out',
        })

        this.isRotationActive = false
        this.DOM.el.classList.remove('rotation-active')
        this.currentRotation = 0
        this.currentScale = 1

        this.layerOutlines.forEach((outline) => {
          outline.classList.remove('active')
        })

        this.layerShadows.forEach((shadow) => {
          shadow.classList.remove('active')
        })
      }

      destroy() {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame)
        }
        if (this.hoverTimeline) {
          this.hoverTimeline.kill()
        }

        this.layerOutlines.forEach((outline) => {
          if (outline.parentNode) {
            outline.parentNode.removeChild(outline)
          }
        })

        this.layerShadows.forEach((shadow) => {
          if (shadow.parentNode) {
            shadow.parentNode.removeChild(shadow)
          }
        })
      }
    }

    const theImage = document.querySelector('.image')
    const imageHoverInstance = new ImageHover(theImage)
  }

  useLoadJS('/js/gsap.3.12.5.min.js', init)

  // React.useEffect(init, [])
}
