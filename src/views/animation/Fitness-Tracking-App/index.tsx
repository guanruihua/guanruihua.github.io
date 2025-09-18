import React from 'react'
import './index.less'
import { Flex } from 'aurad'

export default function () {
  React.useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      animateStepsProgress()
      setupTouchFeedback()
    })

    function animateStepsProgress() {
      const stepCounter = document.getElementById('step-counter')
      const progressRing = document.getElementById('progress-ring')

      if (!stepCounter || !progressRing) return

      const maxSteps = 10000
      const currentSteps = 6916
      let displayedSteps = 0

      const circumference = 2 * Math.PI * 88
      progressRing.style.strokeDasharray = circumference
      progressRing.style.strokeDashoffset = circumference

      const stepInterval = setInterval(() => {
        displayedSteps += Math.ceil(currentSteps / 60)
        if (displayedSteps >= currentSteps) {
          displayedSteps = currentSteps
          clearInterval(stepInterval)
        }

        stepCounter.textContent = displayedSteps.toLocaleString()

        const offset =
          circumference - (displayedSteps / maxSteps) * circumference
        progressRing.style.strokeDashoffset = offset
      }, 20)
    }

    function setupTouchFeedback() {
      const interactiveElements = document.querySelectorAll(
        '.workout-card, .achievement, .chart-bar, .recommendation-action, .nav-item',
      )

      interactiveElements.forEach((element) => {
        element.addEventListener('touchstart', () => {
          element.classList.add('touch-active')
        })

        ;['touchend', 'touchcancel'].forEach((event) => {
          element.addEventListener(event, () => {
            element.classList.remove('touch-active')
          })
        })
      })
    }
  }, [])

  return (
    <Flex className="animation__Fitness-Tracking-App" alginCenter center>
      <div className="phone-frame">
        <div className="notch" />
        <div className="home-indicator" />
        <div className="phone-screen">
          <div className="status-bar">
            <div className="time">3:09</div>
            <div className="status-icons">
              <div className="signal">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x={1} y={14} width={4} height={6} rx={1} />
                  <rect x={7} y={10} width={4} height={10} rx={1} />
                  <rect x={13} y={6} width={4} height={14} rx={1} />
                  <rect x={19} y={2} width={4} height={18} rx={1} />
                </svg>
              </div>
              <div className="wifi">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1={12} y1={20} x2={12} y2={20} />
                </svg>
              </div>
              <div className="battery">
                <svg
                  width={20}
                  height={16}
                  viewBox="0 0 24 16"
                  fill="currentColor"
                >
                  <rect
                    x={2}
                    y={2}
                    width={18}
                    height={12}
                    rx={2}
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                  />
                  <rect x={4} y={4} width={14} height={8} rx={1} />
                  <path
                    d="M23 8L23 8"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="container">
            <div id="home-content" className="tab-content active">
              <div className="date">Wednesday 27 March</div>
              <div className="app-header">
                <h1 className="app-title">FitTrack</h1>
                <div className="user-avatar" id="user-avatar">
                  GC
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-container">
                  <svg width={200} height={200} viewBox="0 0 200 200">
                    <circle
                      className="progress-circle progress-bg"
                      cx={100}
                      cy={100}
                      r={88}
                    />
                    <circle
                      className="progress-circle progress-fill"
                      cx={100}
                      cy={100}
                      r={88}
                      id="progress-ring"
                    />
                  </svg>
                  <div className="progress-text">
                    <div className="step-count" id="step-counter">
                      0
                    </div>
                    <div className="step-label">steps</div>
                    <div className="step-goal">Goal: 10,000</div>
                  </div>
                </div>
                <div className="activity-stats">
                  <div className="activity-stat">
                    <div className="stat-value">5.2</div>
                    <div className="stat-label">km</div>
                  </div>
                  <div className="activity-stat">
                    <div className="stat-value">465</div>
                    <div className="stat-label">cal</div>
                  </div>
                  <div className="activity-stat">
                    <div className="stat-value">52</div>
                    <div className="stat-label">min</div>
                  </div>
                </div>
              </div>
              <div className="weekly-chart">
                <div className="chart-header">
                  <div className="chart-title">Weekly Activity</div>
                  <div className="chart-controls">
                    <button className="chart-button" data-type="steps">
                      Steps
                    </button>
                    <button
                      className="chart-button active"
                      data-type="calories"
                    >
                      Calories
                    </button>
                    <button className="chart-button" data-type="distance">
                      Distance
                    </button>
                  </div>
                </div>
                <div className="chart-container" id="chart-container">
                  <div className="chart-bar mon-bar">
                    <div className="bar-value">420</div>
                    <div className="day-label">Mon</div>
                  </div>
                  <div className="chart-bar tue-bar">
                    <div className="bar-value">350</div>
                    <div className="day-label">Tue</div>
                  </div>
                  <div className="chart-bar wed-bar active">
                    <div className="bar-value">580</div>
                    <div className="day-label">Wed</div>
                  </div>
                  <div className="chart-bar thu-bar">
                    <div className="bar-value">490</div>
                    <div className="day-label">Thu</div>
                  </div>
                  <div className="chart-bar fri-bar">
                    <div className="bar-value">610</div>
                    <div className="day-label">Fri</div>
                  </div>
                  <div className="chart-bar sat-bar">
                    <div className="bar-value">320</div>
                    <div className="day-label">Sat</div>
                  </div>
                  <div className="chart-bar sun-bar">
                    <div className="bar-value">475</div>
                    <div className="day-label">Sun</div>
                  </div>
                </div>
              </div>
              <div className="section-title">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Health Insights
              </div>
              <div className="card sleep-card">
                <div className="sleep-header">
                  <div className="sleep-icon-container">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4361EE"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.2 3.4 8.2 8 14 4.6-5.8 8-8.8 8-14a8 8 0 0 0-8-8z" />
                      <path d="M12 6v4" />
                      <path d="M12 14h.01" />
                    </svg>
                  </div>
                  <div className="sleep-info">
                    <div className="sleep-title">Sleep Quality</div>
                    <div className="sleep-time">Last night: 7h 15m</div>
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar sleep-progress" />
                </div>
                <div className="sleep-score">
                  <span className="score-label">Sleep Score</span>
                  <span className="score-value">85/100 (Good)</span>
                </div>
              </div>
              <div className="section-title">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Today's Workouts
              </div>
              <div className="workout-list">
                <div className="workout-card" id="morning-run">
                  <div className="workout-icon">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4CC9F0"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 17l6-6-4-4 6-6m4 18v-8m4 4h-8" />
                    </svg>
                  </div>
                  <div className="workout-info">
                    <div className="workout-name">Morning Run</div>
                    <div className="workout-meta">
                      <span>5.2 km</span>
                      <span>32 min</span>
                      <span>345 cal</span>
                    </div>
                  </div>
                </div>
                <div className="workout-card" id="evening-yoga">
                  <div className="workout-icon">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4CC9F0"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                    </svg>
                  </div>
                  <div className="workout-info">
                    <div className="workout-name">Evening Yoga</div>
                    <div className="workout-meta">
                      <span>20 min</span>
                      <span>120 cal</span>
                    </div>
                  </div>
                </div>
                <div className="workout-card" id="add-workout">
                  <div className="workout-icon">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4CC9F0"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                  </div>
                  <div className="workout-info">
                    <div className="workout-name">Add Workout</div>
                    <div className="workout-meta">
                      <span>Log your activity</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-title">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                  <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                  <path d="M15 2v5h5" />
                </svg>
                For You
              </div>
              <div className="card recommendation-card">
                <div className="recommendation-icon">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div className="recommendation-content">
                  <div className="recommendation-title">
                    Rest Day Recommendation
                  </div>
                  <div className="recommendation-text">
                    You've been quite active this week! Consider taking a rest
                    day or doing light stretching to help your muscles recover.
                  </div>
                  <div className="recommendation-action">
                    View Recovery Tips
                  </div>
                </div>
              </div>
              <div className="card weekly-challenge">
                <div className="challenge-header">
                  <div className="challenge-title">Weekly Challenge</div>
                  <div className="challenge-days-left">3 DAYS LEFT</div>
                </div>
                <div className="challenge-description">
                  Complete 5 workouts this week and earn 500 points
                </div>
                <div className="challenge-progress-container">
                  <div className="challenge-progress-bar">
                    <div className="challenge-progress-fill" />
                  </div>
                  <div className="challenge-progress-text">3/5</div>
                </div>
                <button className="challenge-button">View Challenge</button>
              </div>
              <div className="section-title">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                  <circle cx={12} cy={8} r={7} />
                </svg>
                Achievements
              </div>
            </div>
            <div className="achievements">
              <div className="achievement unlocked" id="early-bird">
                <div className="achievement-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="achievement-name">Early Bird</div>
              </div>
              <div className="achievement unlocked" id="step-master">
                <div className="achievement-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div className="achievement-name">Step Master</div>
              </div>
              <div className="achievement" id="marathon">
                <div className="achievement-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="achievement-name">Marathon</div>
              </div>
              <div className="achievement unlocked" id="yoga-master">
                <div className="achievement-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>
                <div className="achievement-name">Yoga Master</div>
              </div>
              <div className="achievement" id="night-owl">
                <div className="achievement-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                </div>
                <div className="achievement-name">Night Owl</div>
              </div>
              <div className="achievement" id="streak">
                <div className="achievement-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CC9F0"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 3v5" />
                    <path d="M18 3h6" />
                    <path d="M3 16v5" />
                    <path d="M6 21H0" />
                    <path d="m12 3-9 9 9 9" />
                  </svg>
                </div>
                <div className="achievement-name">7-Day Streak</div>
              </div>
            </div>
          </div>
          <div className="bottom-nav">
            <div className="nav-item active" id="home-tab">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="nav-icon"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="nav-label">Home</span>
            </div>
            <div className="nav-item" id="stats-tab">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="nav-icon"
              >
                <line x1={18} y1={20} x2={18} y2={10} />
                <line x1={12} y1={20} x2={12} y2={4} />
                <line x1={6} y1={20} x2={6} y2={14} />
              </svg>
              <span className="nav-label">Stats</span>
            </div>
            <div className="nav-item" id="workout-tab">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="nav-icon"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="nav-label">Workouts</span>
            </div>
            <div className="nav-item" id="profile-tab">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="nav-icon"
              >
                <circle cx={12} cy={8} r={5} />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              <span className="nav-label">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  )
}
