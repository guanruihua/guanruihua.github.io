import React from 'react'
import './index.less'

export default function () {
  React.useEffect(() => {
    const graph = document.getElementById('activity-graph')
    if (!graph) return

    const year = new Date().getFullYear()
    const firstDay = new Date(year, 0, 1)
    const dayOfWeek = firstDay.getDay()
    const offset = (dayOfWeek + 6) % 7

    for (let i = 0; i < offset; i++) {
      const empty = document.createElement('span')
      graph.appendChild(empty)
    }

    const daysInYear: number =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365

    const activityData = Array.from({ length: daysInYear }, () =>
      Math.floor(Math.random() * 5),
    )

    activityData.forEach((count, index) => {
      const date = getDateFromDayOfYear(index + 1)
      const day = document.createElement('div')

      day.classList.add('day', `level-${count}`, `m-${date.getMonth() + 1}`)

      day.setAttribute('title', date.toDateString())

      graph.appendChild(day)
    })

    function getDateFromDayOfYear(dayOfYear: number, year = 2025) {
      const start = new Date(year, 0, 1)
      start.setDate(start.getDate() + (dayOfYear - 1))

      return start
    }
  }, [])

  return (
    <div className="animation__yearly-activity-grid">
      <div className="wrapper">
        <div className="x">
          <div id="activity-graph"></div>
        </div>
      </div>
    </div>
  )
}
