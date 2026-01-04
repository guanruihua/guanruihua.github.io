// @ts-nocheck
import React from 'react'
import { animate, stagger, press, hover } from 'motion'
import { Howl } from 'howler'
import { useLoadJS } from '@/hook'

export const usePageState = () => {
  const load = () => {
    console.log(
      //
      (window as any).ProgressBar,
      (window as any).confetti,
    )
    const safe = (fn, fallback) => {
      try {
        return fn()
      } catch (err) {
        console.warn('Safe-call error:', err)
        return fallback
      }
    }
    const $ = (sel) => document.querySelector(sel)
    const $$ = (sel) => [...document.querySelectorAll(sel)]
    const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

    /* 🧭 Required Elements */
    const steps = $$('.step')
    const distanceMain = $('.distance.to-run')
    const distanceRun = $('.running .distance')
    const stepper = $('.stepper')
    const container = $('#container')
    if (!distanceMain || !distanceRun || !stepper || !container) {
      throw new Error(
        'Missing required DOM elements: .distance.to-run, .running .distance, .stepper, #container',
      )
    }

    /* 🔊 Shared AudioContext (safe) */
    let audioCtx
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    } catch (err) {
      console.warn('AudioContext unavailable:', err)
      audioCtx = { resume: async () => {} }
    }

    /* 🔊 Sound Utility */
    let currentSound
    const play = (file, volume = 0.5, speed = 1) => {
      try {
        audioCtx.resume().catch(() => {})
        currentSound?.stop?.()
        currentSound = new Howl({
          src: [file],
          autoplay: true,
          volume,
          rate: speed,
          onplayerror: (_, e) => console.warn('Howl play error:', e),
          onloaderror: (_, e) => console.warn('Howl load error:', e),
        })
      } catch (e) {
        console.warn('Play failed:', e)
      }
    }

    /* 🔊 Background sound (autoplay-safe) */
    const bgSoundUrl = '/music/birds.mp3'
    safe(() => new Howl({ src: [bgSoundUrl], autoplay: true, volume: 0.4 }))

    const tryPlayBackground = () => {
      safe(() => audioCtx.resume())
      safe(() => new Howl({ src: [bgSoundUrl], autoplay: true, volume: 0.4 }))
      ;['click', 'touchstart', 'keydown'].forEach((evt) =>
        document.removeEventListener(evt, tryPlayBackground),
      )
    }
    ;['click', 'touchstart', 'keydown'].forEach((evt) =>
      document.addEventListener(evt, tryPlayBackground, { passive: true }),
    )

    /* 🧮 Init numeric values safely */
    let value = parseFloat(distanceMain.textContent || '10') || 10
    let lastValue = value
    distanceMain.textContent = value.toFixed(1)
    distanceRun.textContent = value.toFixed(1)

    /* 📊 Progress Bar (create early) */
    const bar = safe(
      () =>
        new ProgressBar.SemiCircle(container, {
          strokeWidth: 10,
          color: '#ffffff',
          trailWidth: 0,
          easing: 'easeInOut',
          duration: 500,
          svgStyle: null,
          text: { value: '', alignToBottom: false },
          from: { color: '#ababab' },
          to: { color: '#ffffff' },
        }),
    ) || { animate: () => {} }

    /* ✨ Intro Animation (safe) */
    safe(async () => {
      await animate(
        '.card',
        { opacity: 1, scale: [0, 1] },
        { type: 'spring', stiffness: 50 },
      )
      await animate(
        '.head',
        { opacity: [0, 1], scale: [0, 1] },
        { type: 'spring', stiffness: 50 },
      )
      setTimeout(() => {
        safe(() =>
          animate('.label-wrap', { opacity: 0.4 }, { delay: stagger(0.1) }),
        )
        safe(() => animate('.value', { opacity: 1 }, { delay: stagger(0.1) }))
      }, 25)
      safe(() =>
        animate(
          '.button, .button-icon, .button-text',
          { opacity: 1, scale: [0, 1] },
          { type: 'spring', stiffness: 100 },
        ),
      )
    })

    /* 🎛️ Stepper UI Update */
    const updateUI = () => {
      safe(() => {
        const currentMain = parseFloat(distanceMain.textContent || '0') || 0
        if (isRunning) {
          distanceRun.textContent = value.toFixed(1)
        } else {
          animate(currentMain, value, {
            duration: 0.3,
            easing: 'easeOut',
            onUpdate: (v) => (distanceMain.textContent = v.toFixed(1)),
          })
        }
        animate('.aura', { opacity: [0.5, 0.7, 0.5] }, { duration: 0.3 })

        steps.forEach((s, i) => {
          const dist = Math.abs(i - value)
          const proximity = clamp(1 - (dist * 2) / 20, 0, 1)
          const scale = 1 + proximity * 0.2
          animate(
            s,
            {
              width: `${scale * 20}px`,
              opacity: proximity,
              zIndex: Math.floor(proximity * 50),
            },
            { duration: 0.25, easing: 'easeOut' },
          )
        })
      })
    }

    /* ✋ Stepper Drag (mouse + touch) */
    let startY = null
    const threshold = 10

    const onMove = (e) => {
      if (startY === null) return
      const y = e.touches ? e.touches[0].clientY : e.clientY
      const delta = startY - y
      if (Math.abs(delta) > threshold) {
        value = clamp(
          value + Math.round(delta / threshold),
          1,
          Math.max(1, steps.length - 1),
        )
        if (value !== lastValue) {
          play(
            'https://cdn.freesound.org/previews/677/677861_9129912-lq.mp3',
            0.2,
          )
          updateUI()
          lastValue = value
        }
        startY = y
      }
    }

    const onStart = (e) => {
      startY = e.touches ? e.touches[0].clientY : e.clientY
      stepper.classList.add('pull')
      document.body.classList.add('pull')
      document.addEventListener('mousemove', onMove)
      document.addEventListener('touchmove', onMove, { passive: true })
    }
    const onEnd = () => {
      stepper.classList.remove('pull')
      document.body.classList.remove('pull')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', onMove)
      startY = null
      updateUI()
    }
    stepper.addEventListener('mousedown', onStart)
    stepper.addEventListener('touchstart', onStart, { passive: true })
    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchend', onEnd, { passive: true })

    /* 🔄 Reset Widget */
    let confettiShown = false
    let isRunning = false
    let runInterval = null
    let runSound, heartSound, breathingSound

    const resetWidget = async () => {
      safe(() =>
        animate(
          '.item',
          { scale: 1, opacity: 1 },
          { type: 'spring', stiffness: 100, delay: stagger(0.05) },
        ),
      )
      clearInterval(runInterval)
      runInterval = null
      confettiShown = false
      isRunning = false
      safe(() => runSound?.stop?.())
      safe(() => heartSound?.stop?.())
      safe(() => breathingSound?.stop?.())

      await safe(() =>
        animate('.chart', { scale: 0, opacity: 0 }, { duration: 0.4 }),
      )
      const runningEl = $('.running')
      if (runningEl) runningEl.style.display = 'none'

      distanceMain.textContent = value.toFixed(1)
      distanceRun.textContent = value.toFixed(1)

      safe(() => animate('.step', { scale: 1, opacity: 1 }, { duration: 0.2 }))
      safe(() => animate('.bg', { width: '15.25rem' }))
      animate(
        '.item',
        { scale: 1, opacity: 1 },
        { type: 'spring', stiffness: 100, delay: stagger(0.05) },
      )
      animate(
        '.label-wrap',
        { scale: 1, opacity: 1 },
        { type: 'spring', stiffness: 100, delay: stagger(0.05) },
      )

      safe(() =>
        animate(
          '.head',
          { scale: 1, opacity: 1 },
          { type: 'spring', stiffness: 50, delay: stagger(0.05) },
        ),
      )
      setTimeout(updateUI, 600)
      safe(() => animate('.main', { scale: 1 }))

      const start = $('.button-text')
      const pause = $('.pause-text')
      if (pause && start) {
        pause.style.display = 'none'
        start.style.display = 'flex'
        animate(start, { scale: 1, opacity: 1, y: [10, 0] })
      }
    }

    /* 🪄 Hover animation */
    hover('.button', (el) => {
      safe(() => animate(el, { opacity: 1, scale: 1.1, color: 'black' }))
      safe(() => animate('.button-icon', { scale: 1.1, rotate: 10 }))
      safe(() => animate('.button-bg', { scaleX: 1 }, { duration: 0.25 }))
      return () => {
        safe(() => animate(el, { opacity: 0.9, scale: 1, color: 'white' }))
        safe(() => animate('.button-icon', { scale: 1, rotate: 0 }))
        safe(() => animate('.button-bg', { scaleX: 0 }, { duration: 0.25 }))
      }
    })

    /* ▶️ Start / End Run */
    press('.button', async (el) => {
      if (isRunning && !runInterval) return // guard inconsistent states
      play('https://cdn.freesound.org/previews/582/582898_5965684-lq.mp3')
      animate(el, { scale: 1.1 })

      setTimeout(async () => {
        const start = $('.button-text')
        const pause = $('.pause-text')
        const show = isRunning ? start : pause
        const hide = isRunning ? pause : start

        if (hide && show) {
          safe(() => {
            animate(hide, { scale: 0, opacity: 0, y: [0, 10] })
            hide.style.display = 'none'
            show.style.display = 'flex'
            animate(show, { scale: 1, opacity: 1, y: [10, 0] })
            animate('.bg', { width: isRunning ? '15.25rem' : '100%' })
            animate(
              '.item',
              { scale: isRunning ? 1 : 0, opacity: isRunning ? 1 : 0 },
              { type: 'spring', stiffness: 100, delay: stagger(0.1) },
            )
            animate(
              '.head',
              { scale: isRunning ? 1 : 0, opacity: isRunning ? 1 : 0 },
              { type: 'spring', stiffness: 50, delay: stagger(0.1) },
            )
            animate(
              '.step',
              { scale: isRunning ? 1 : 0, opacity: isRunning ? 1 : 0 },
              { type: 'spring', stiffness: 100, delay: stagger(0.025) },
            )
            animate(
              el,
              {
                width: isRunning ? '11rem' : '14rem',
                left: isRunning ? '0' : '1rem',
              },
              { delay: isRunning ? 0 : 0.75 },
            )
            animate('.main', { scale: isRunning ? 1 : 0.75 })
          })
        }

        /* 🏃 Start Run */
        if (!isRunning) {
          confettiShown = false
          const runningEl = $('.running')
          if (runningEl) runningEl.style.display = 'flex'
          safe(() => animate('.chart', { scale: 1, opacity: 1 }))

          runSound = new Howl({
            src: [
              'https://cdn.pixabay.com/audio/2024/04/04/audio_2a0847e497.mp3',
            ],
            volume: 0.5,
            autoplay: true,
          })
          heartSound = new Howl({
            src: [
              'https://cdn.pixabay.com/audio/2022/03/24/audio_ae449e67b0.mp3',
            ],
            volume: 0.5,
            autoplay: true,
          })
          breathingSound = new Howl({
            src: [
              'https://cdn.pixabay.com/audio/2022/01/18/audio_0fe7251bf1.mp3',
            ],
            loop: true,
            volume: 0.5,
            autoplay: true,
          })

          let progress = 0
          let remaining = parseFloat(distanceMain.textContent || '10')

          clearInterval(runInterval)
          runInterval = setInterval(() => {
            progress = Math.min(progress + 0.02, 1)
            remaining = Math.max(remaining - 0.2, 0)
            distanceRun.textContent = remaining.toFixed(1)
            safe(() => bar.animate(progress))

            if (remaining <= 0 && !confettiShown) {
              confettiShown = true
              clearInterval(runInterval)
              runInterval = null
              safe(() => bar.animate(1))
              safe(() =>
                confetti({
                  particleCount: 40,
                  spread: 60,
                  startVelocity: 25,
                  gravity: 0.9,
                  scalar: 0.8,
                  ticks: 200,
                  origin: { y: 0.6 },
                  colors: ['#fff', '#ccc', '#aaa'],
                }),
              )
              new Howl({
                src: [
                  'https://www.myinstants.com/media/sounds/confetti-pop.mp3',
                ],
                autoplay: true,
                volume: 0.8,
                onplayerror: (_, e) => console.warn('Howl play error:', e),
                onloaderror: (_, e) => console.warn('Howl load error:', e),
              })
              resetWidget()
            }
          }, 1000)

          /* ⏹ End Run */
        } else {
          await resetWidget()
          clearInterval(runInterval)
          runInterval = null
          safe(() => bar.animate(0))
          safe(() => animate('.chart', { scale: 0, opacity: 0 }))
          const runningEl = $('.running')
          if (runningEl) runningEl.style.display = 'none'
          distanceMain.textContent = value.toFixed(1)
          distanceRun.textContent = value.toFixed(1)
        }

        isRunning = !isRunning
      }, 500)
    })

    updateUI()
  }

  useLoadJS(
    [
      '/js/progressbar/1.1.1/progressbar.js',
      '/js/canvas-confetti/1.9.3/confetti.browser.min.js',
    ],
    () => {
      load()
    },
  )

  return {}
}
