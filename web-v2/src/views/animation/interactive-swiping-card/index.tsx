import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()
  return (
    <div className="animation__interactive-swiping-card">
      <div className="card-container">
        <div className="card" id="card">
          <div className="background-gradient"></div>

          <div className="card-header">
            <div className="card-title">Conversion</div>
            <div className="dropdown-container">
              <div className="dropdown-trigger" id="dropdownTrigger">
                <span id="selectedPeriod">Weekly</span>
              </div>
              <div className="dropdown-menu" id="dropdownMenu">
                <div className="dropdown-item" data-period="daily">
                  Daily
                </div>
                <div className="dropdown-item selected" data-period="weekly">
                  Weekly
                </div>
                <div className="dropdown-item" data-period="monthly">
                  Monthly
                </div>
                <div className="dropdown-item" data-period="yearly">
                  Yearly
                </div>
              </div>
            </div>
          </div>

          <div className="content-slider" id="contentSlider">
            {/* Daily Content  */}
            <div className="content-slide" data-slide="0">
              <div className="conversion-section">
                <div className="conversion-label">Conversion Rate</div>
                <div className="conversion-rate">
                  45%<span className="arrow-up">↗</span>
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-wave">
                  <svg width="280" height="60" viewBox="0 0 280 60">
                    <path
                      className="wave-path"
                      d="M0,40 Q70,20 140,30 T280,25"
                    />
                  </svg>
                </div>
                <div className="peak-dot" style={{ left: '65%' }}></div>
              </div>

              <div className="footer">
                <div className="footer-text">
                  Daily performance
                  <br />
                  looking strong
                </div>
                <div className="explore-btn">Explore more</div>
              </div>
            </div>

            {/* Weekly Content (Active)  */}
            <div className="content-slide active" data-slide="1">
              <div className="conversion-section">
                <div className="conversion-label">Conversion Rate</div>
                <div className="conversion-rate">
                  250%<span className="arrow-up">↗</span>
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-wave">
                  <svg width="280" height="60" viewBox="0 0 280 60">
                    <path
                      className="wave-path"
                      d="M0,45 Q50,35 100,40 Q150,15 200,20 Q240,25 280,30"
                    />
                  </svg>
                </div>
                <div className="peak-dot"></div>
              </div>

              <div className="footer">
                <div className="footer-text">
                  Conversions set to
                  <br />
                  rise this month
                </div>
                <div className="explore-btn">Explore more</div>
              </div>
            </div>

            {/* Monthly Content  */}
            <div className="content-slide" data-slide="2">
              <div className="conversion-section">
                <div className="conversion-label">Conversion Rate</div>
                <div className="conversion-rate">
                  180%<span className="arrow-up">↗</span>
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-wave">
                  <svg width="280" height="60" viewBox="0 0 280 60">
                    <path
                      className="wave-path"
                      d="M0,50 Q70,30 140,35 Q210,20 280,25"
                    />
                  </svg>
                </div>
                <div className="peak-dot" style={{ left: '75%' }}></div>
              </div>

              <div className="footer">
                <div className="footer-text">
                  Monthly trends
                  <br />
                  show steady growth
                </div>
                <div className="explore-btn">Explore more</div>
              </div>
            </div>

            {/* Yearly Content */}
            <div className="content-slide" data-slide="3">
              <div className="conversion-section">
                <div className="conversion-label">Conversion Rate</div>
                <div className="conversion-rate">
                  95%<span className="arrow-down">↘</span>
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-wave">
                  <svg width="280" height="60" viewBox="0 0 280 60">
                    <path
                      className="wave-path"
                      d="M0,25 Q70,20 140,35 Q210,45 280,40"
                    />
                  </svg>
                </div>
                <div
                  className="peak-dot"
                  style={{ left: '30%', top: '35px' }}
                ></div>
              </div>

              <div className="footer">
                <div className="footer-text">
                  Yearly overview
                  <br />
                  needs attention
                </div>
                <div className="explore-btn">Explore more</div>
              </div>
            </div>
          </div>

          <div className="pagination">
            <div className="pagination-dot" data-slide="0"></div>
            <div className="pagination-dot" data-slide="1"></div>
            <div className="pagination-dot" data-slide="2"></div>
            <div className="pagination-dot" data-slide="3"></div>
            <div className="pagination-dot active" data-slide="4"></div>
            <div className="pagination-dot" data-slide="5"></div>
          </div>

          <div className="swipe-indicator"></div>
        </div>
      </div>
    </div>
  )
}
