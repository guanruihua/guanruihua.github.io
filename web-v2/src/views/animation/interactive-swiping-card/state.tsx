import React from 'react'

export const usePageState = () => {
  const init = () => {
    let currentSlide = 1 // Start with Weekly (index 1)
    const slides = document.querySelectorAll('.content-slide')
    const paginationDots = document.querySelectorAll('.pagination-dot')
    const dropdownTrigger = document.getElementById('dropdownTrigger')
    const dropdownMenu = document.getElementById('dropdownMenu')
    const selectedPeriod = document.getElementById('selectedPeriod')
    const contentSlider = document.getElementById('contentSlider')

    let startX = 0
    let currentX = 0
    let isDragging = false

    // Dropdown functionality
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation()
      dropdownMenu.classList.toggle('active')
      dropdownTrigger.classList.toggle('active')
    })

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdownMenu.classList.remove('active')
      dropdownTrigger.classList.remove('active')
    })

    // Dropdown item selection
    document.querySelectorAll('.dropdown-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()

        // Remove selected class from all items
        document
          .querySelectorAll('.dropdown-item')
          .forEach((i) => i.classList.remove('selected'))

        // Add selected class to clicked item
        item.classList.add('selected')

        // Update selected period text
        const period = item.dataset.period
        selectedPeriod.textContent =
          period.charAt(0).toUpperCase() + period.slice(1)

        // Switch to corresponding slide
        const slideMap = { daily: 0, weekly: 1, monthly: 2, yearly: 3 }
        switchToSlide(slideMap[period])

        // Close dropdown
        dropdownMenu.classList.remove('active')
        dropdownTrigger.classList.remove('active')
      })
    })

    // Touch/Mouse events for swiping
    contentSlider.addEventListener('mousedown', startDrag)
    contentSlider.addEventListener('touchstart', startDrag, { passive: true })

    document.addEventListener('mousemove', drag)
    document.addEventListener('touchmove', drag, { passive: true })

    document.addEventListener('mouseup', endDrag)
    document.addEventListener('touchend', endDrag)

    function startDrag(e) {
      isDragging = true
      startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
      currentX = startX
    }

    function drag(e) {
      if (!isDragging) return

      currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
      const diff = currentX - startX

      // Visual feedback during drag
      if (Math.abs(diff) > 10) {
        contentSlider.style.transform = `translateX(${diff * 0.3}px)`
      }
    }

    function endDrag() {
      if (!isDragging) return
      isDragging = false

      const diff = currentX - startX
      const threshold = 80

      // Reset visual transform
      contentSlider.style.transform = ''

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentSlide > 0) {
          // Swipe right - previous slide
          switchToSlide(currentSlide - 1)
        } else if (diff < 0 && currentSlide < slides.length - 1) {
          // Swipe left - next slide
          switchToSlide(currentSlide + 1)
        }
      }
    }

    function switchToSlide(index) {
      if (index < 0 || index >= slides.length) return

      // Update slides
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev')
        if (i === index) {
          slide.classList.add('active')
        } else if (i < index) {
          slide.classList.add('prev')
        }
      })

      currentSlide = index

      // Update dropdown selection
      const periods = ['daily', 'weekly', 'monthly', 'yearly']
      if (periods[index]) {
        document.querySelectorAll('.dropdown-item').forEach((item) => {
          item.classList.remove('selected')
          if (item.dataset.period === periods[index]) {
            item.classList.add('selected')
            selectedPeriod.textContent =
              periods[index].charAt(0).toUpperCase() + periods[index].slice(1)
          }
        })
      }
    }

    // Pagination dot clicks
    paginationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index < slides.length) {
          switchToSlide(index)
        }
      })
    })

    // Prevent context menu
    contentSlider.addEventListener('contextmenu', (e) => e.preventDefault())
  }

  React.useEffect(init, [])
}
