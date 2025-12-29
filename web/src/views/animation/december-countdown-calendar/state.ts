// @ts-nocheck
import React from 'react'

export const usePageState = () => {
  React.useEffect(() => {
    // ----------------------
    // Body background switch
    // ----------------------
    setTimeout(() => {
      document.querySelector('.bg1').style.opacity = 0
      document.querySelector('.bg2').style.opacity = 1
    }, 5000)

    // ----------------------
    // Calendar generation + modal + buttons (ALLES IN ÉÉN IIFE)
    // ----------------------
    ;(function () {
      const calendar = document.getElementById('calendar')
      if (!calendar) return

      const decYear = 2025
      const decMonth = 11
      const janYear = 2026
      const janMonth = 0

      const decDays = 31
      const firstDecDay = new Date(decYear, decMonth, 1).getDay()
      const decStartIndex = firstDecDay === 0 ? 6 : firstDecDay - 1

      // lege slots
      for (let i = 0; i < decStartIndex; i++) {
        const div = document.createElement('div')
        div.className = 'day empty'
        calendar.appendChild(div)
      }

      // ---- DECEMBER ----
      for (let d = 1; d <= decDays; d++) {
        const el = document.createElement('button')
        el.className = 'day'
        el.type = 'button'
        el.setAttribute('data-day', d)
        el.setAttribute('data-month', 'Dec')

        const num = document.createElement('div')
        num.className = 'num'
        num.innerHTML = `<strong>${d}</strong>`
        el.appendChild(num)

        if (d === 1) el.appendChild(note('Hello December!'))
        if (d === 5) el.appendChild(note('Light a candle tonight.'))
        if (d === 24) el.appendChild(note('Prepare for tomorrow.'))

        if (d === 25) el.appendChild(tag(el, 'christmas', 'Christmas'))
        if (d === 31) el.appendChild(tag(el, 'newyears', "New Year's Eve"))

        el.addEventListener('click', onDayClick)
        calendar.appendChild(el)
      }

      // ---- JANUARI ----
      for (let d = 1; d <= 11; d++) {
        const el = document.createElement('button')
        el.className = 'day january'
        el.type = 'button'
        el.setAttribute('data-day', d)
        el.setAttribute('data-month', 'Jan')

        const num = document.createElement('div')
        num.className = 'num'
        num.innerHTML = `<strong>${d}</strong>`
        el.appendChild(num)

        if (d === 1) {
          el.appendChild(tag(el, 'newyear', "New Year's Day"))
          el.appendChild(note(''))
        }

        el.addEventListener('click', onDayClick)
        calendar.appendChild(el)
      }

      // ✅ GRID altijd 42
      const need = 42 - calendar.querySelectorAll('.day').length
      for (let i = 0; i < need; i++) {
        const div = document.createElement('div')
        div.className = 'day empty'
        calendar.appendChild(div)
      }

      // ----------------------
      // Modal handling
      // ----------------------
      const modal = document.getElementById('modal')
      const modalTitle = document.getElementById('modalTitle')
      const modalText = document.getElementById('modalText')
      const closeModal = document.getElementById('closeModal')

      function onDayClick() {
        const day = +this.getAttribute('data-day')
        const month = this.getAttribute('data-month')
        const year = month === 'Dec' ? decYear : janYear

        modalTitle.textContent = `${month} ${day}, ${year}`

        if (month === 'Dec' && day === 25) {
          modalText.innerHTML = `Merry Christmas! 🎄`
        } else if (month === 'Dec' && day === 31) {
          modalText.textContent = `New Year's Eve! 🎉`
        } else if (month === 'Jan' && day === 1) {
          modalText.innerHTML = `Happy New Year's Day! <br/>Visiting family, and have a peaceful day.`
        } else {
          modalText.textContent = `A lovely winter day — ${day} ${month} ${year}.`
        }
        modal.classList.add('show')
        modal.setAttribute('aria-hidden', 'false')
      }

      closeModal.addEventListener('click', () => {
        modal.classList.remove('show')
        modal.setAttribute('aria-hidden', 'true')
      })

      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) {
          modal.classList.remove('show')
          modal.setAttribute('aria-hidden', 'true')
        }
      })

      // ----------------------
      // Highlight today
      // ----------------------
      document.getElementById('todayBtn').addEventListener('click', () => {
        const today = new Date()
        const day = today.getDate()
        const month = today.toLocaleString('en-US', { month: 'short' })

        const el = calendar.querySelector(
          `.day[data-day='${day}'][data-month='${month}']`,
        )
        if (el) {
          el.style.outline = '3px solid red'
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          setTimeout(() => (el.style.outline = ''), 3800)
        }
      })

      // ----------------------
      // Reset button
      // ----------------------
      document.getElementById('resetBtn').addEventListener('click', () => {
        modal.classList.remove('show')
        calendar.querySelectorAll('.day').forEach((el) => {
          el.style.outline = ''
        })
      })

      function note(txt) {
        const n = document.createElement('div')
        n.className = 'note'
        n.textContent = txt
        return n
      }

      function tag(el, cls, txt) {
        el.classList.add(cls)
        const t = document.createElement('div')
        t.className = 'tag'
        t.textContent = txt
        return t
      }
    })()

    // ----------------------
    // ✅ Ultra-constante sneeuw
    // ----------------------
    ;(function () {
      const body = document.body
      const START_SNOW = 50
      const SNOW_PER_SECOND = 20
      const FALL_DURATION = 6000

      function createFlake() {
        const flake = document.createElement('div')
        flake.textContent = '❆'
        flake.style.position = 'fixed'
        flake.style.top = '-5vh'
        flake.style.left = Math.random() * 100 + 'vw'
        flake.style.fontSize = 8 + Math.random() * 20 + 'px'
        flake.style.opacity = Math.random()
        flake.style.pointerEvents = 'none'
        flake.style.zIndex = 9999
        body.appendChild(flake)

        let start = null
        function anim(ts) {
          if (!start) start = ts
          const p = (ts - start) / FALL_DURATION
          flake.style.transform = `translate(0, ${p * 110}vh)`
          flake.style.opacity = 1 - p
          if (p < 1) requestAnimationFrame(anim)
          else flake.remove()
        }
        requestAnimationFrame(anim)
      }

      for (let i = 0; i < START_SNOW; i++) createFlake()

      let last = performance.now(),
        carry = 0
      function loop(now) {
        carry += ((now - last) / 1000) * SNOW_PER_SECOND
        last = now
        while (carry >= 1) {
          createFlake()
          carry--
        }
        requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
    })()

    // ----------------------
    // Santa sleigh animation
    // ----------------------
    window.addEventListener('load', () => {
      document.getElementById('sleigh').classList.add('animate')
    })

    // Countdown logic
    // ----------------------
    function getLocalTimeZone() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local'
      } catch (e) {
        return 'Local'
      }
    }

    function startCountdowns() {
      const tz = getLocalTimeZone()
      document.getElementById('tzName').textContent = tz

      function nextChristmas(now) {
        let target = new Date(now.getFullYear(), 11, 25, 0, 0, 0, 0)
        if (now >= target)
          target = new Date(now.getFullYear() + 1, 11, 25, 0, 0, 0, 0)
        return target
      }
      function nextNewYear(now) {
        return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0)
      }
      function formatTargetDate(d) {
        return d.toLocaleString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }

      function updateOnce() {
        const now = new Date()
        const christmas = nextChristmas(now)
        const newyear = nextNewYear(now)

        document.getElementById(
          'christmasTarget',
        ).textContent = `Target: ${formatTargetDate(christmas)}`
        document.getElementById(
          'newyearTarget',
        ).textContent = `Target: ${formatTargetDate(newyear)}`
        document.getElementById(
          'christmasLocal',
        ).textContent = `Timezone: ${tz}`
        document.getElementById('newyearLocal').textContent = `Timezone: ${tz}`

        updateDisplay(
          christmas - now,
          {
            days: 'c-days',
            hours: 'c-hours',
            mins: 'c-mins',
            secs: 'c-secs',
            bar: 'c-bar',
            status: 'christmasStatus',
          },
          christmas,
        )
        updateDisplay(
          newyear - now,
          {
            days: 'n-days',
            hours: 'n-hours',
            mins: 'n-mins',
            secs: 'n-secs',
            bar: 'n-bar',
            status: 'newyearStatus',
          },
          newyear,
        )
      }

      function updateDisplay(remainingMs, ids, targetDate) {
        const totalSec = Math.floor(remainingMs / 1000)
        const days = Math.floor(totalSec / 86400)
        const hours = Math.floor((totalSec % 86400) / 3600)
        const mins = Math.floor((totalSec % 3600) / 60)
        const secs = totalSec % 60

        document.getElementById(ids.days).textContent = days.toString()
        document.getElementById(ids.hours).textContent = String(hours).padStart(
          2,
          '0',
        )
        document.getElementById(ids.mins).textContent = String(mins).padStart(
          2,
          '0',
        )
        document.getElementById(ids.secs).textContent = String(secs).padStart(
          2,
          '0',
        )

        const now = new Date()
        const cycleStart = new Date(
          targetDate.getFullYear() - 1,
          targetDate.getMonth(),
          targetDate.getDate(),
          0,
          0,
          0,
          0,
        )
        const cycleEnd = new Date(targetDate)
        const pct = Math.min(
          100,
          Math.max(0, ((now - cycleStart) / (cycleEnd - cycleStart)) * 100),
        )
        const barEl = document.getElementById(ids.bar)
        if (barEl) barEl.style.width = pct + '%'

        const statusEl = document.getElementById(ids.status)
        if (statusEl) {
          statusEl.textContent =
            remainingMs <= 0
              ? 'Happening now!'
              : `Remaining: ${days}d ${String(hours).padStart(2, '0')}h`
        }
      }

      updateOnce()
      setInterval(updateOnce, 1000)
    }

    startCountdowns()
  }, [])
}
