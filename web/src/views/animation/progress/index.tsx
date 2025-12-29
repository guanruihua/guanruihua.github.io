import React, { useState, useMemo, useId } from 'react'
import './index.less'

const WavyProgress = ({
  size = 250,
  progress = 50,
  strokeWidth = 20,
  scale = 15,
  frequency = 0.05,
  octaves = 2,
  activeColor = '#ceff00',
  inactiveColor = '#333',
  textColor = '#ceff00',
}) => {
  const filterId = useId()

  const radius = 50
  const circumference = 2 * Math.PI * radius

  const strokeDashoffset = useMemo(() => {
    return circumference - (progress / 100) * circumference
  }, [progress, circumference])

  const containerStyle = useMemo(
    () => ({
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
    }),
    [size],
  )

  const textStyle = useMemo(
    () => ({
      color: textColor,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: `${size * 0.2}px`,
      fontWeight: 'bold',
    }),
    [textColor, size],
  )

  const circleStyle = {
    fill: 'none',
    strokeWidth: strokeWidth,
    transition: 'stroke-dashoffset 0.35s ease',
    strokeDasharray: `${circumference} ${circumference}`,
  }

  return (
    <div style={containerStyle as any}>
      <svg
        className="progress-ring"
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
          filter: `url(#${filterId})`,
        }}
        viewBox="0 0 120 120"
      >
        <circle
          className="progress-ring__background"
          style={{ ...circleStyle, stroke: inactiveColor }}
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="progress-ring__progress"
          style={{
            ...circleStyle,
            stroke: activeColor,
            strokeDashoffset: strokeDashoffset,
            strokeLinecap: 'round',
          }}
          r={radius}
          cx="60"
          cy="60"
        />
      </svg>
      <div style={textStyle as any}>{`${Math.round(progress)}%`}</div>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={`${frequency} ${frequency}`}
            numOctaves={octaves}
            result="turbulenceResult"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              values={`${frequency} ${frequency};${frequency + 0.03} ${
                frequency - 0.03
              };${frequency} ${frequency};`}
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulenceResult"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  )
}

// --- App Component ---
// App 组件现在可以直接使用上面的 WavyProgress 组件
export default () => {
  const [progress, setProgress] = useState(50)
  const [strokeWidth, setStrokeWidth] = useState(20)
  const [scale, setScale] = useState(15)
  const [frequency, setFrequency] = useState(0.05)
  const [octaves, setOctaves] = useState(2)

  // 将 CSS 样式直接嵌入到组件中
  const styles = `
    body {
      background-color: #1a1a1a;
      margin: 0;
      font-family: Arial, sans-serif;
    }

    #app-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      flex-direction: column;
      gap: 40px;
    }

    .controls {
      display: flex;
      flex-direction: column;
      gap: 15px;
      background: #2c2c2c;
      padding: 20px;
      border-radius: 8px;
      color: white;
      width: 300px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .control-group label {
      display: flex;
      justify-content: space-between;
    }

    input[type="range"] {
      width: 100%;
    }
  `

  return (
    <>
      <style>{styles}</style>
      <div id="app-container">
        <WavyProgress
          progress={progress}
          strokeWidth={strokeWidth}
          scale={scale}
          frequency={frequency}
          octaves={octaves}
        />

        <div className="controls">
          <div className="control-group">
            <label>
              进度: <span>{progress}%</span>
            </label>
            <input
              type="range"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          <div className="control-group">
            <label>
              边框宽度: <span>{strokeWidth}</span>
            </label>
            <input
              type="range"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              min="1"
              max="50"
              step="1"
            />
          </div>
          <div className="control-group">
            <label>
              波纹幅度 (scale): <span>{scale}</span>
            </label>
            <input
              type="range"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              min="0"
              max="50"
              step="1"
            />
          </div>
          <div className="control-group">
            <label>
              波纹频率 (frequency): <span>{frequency.toFixed(2)}</span>
            </label>
            <input
              type="range"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              min="0.01"
              max="0.2"
              step="0.01"
            />
          </div>
          <div className="control-group">
            <label>
              波纹细节 (octaves): <span>{octaves}</span>
            </label>
            <input
              type="range"
              value={octaves}
              onChange={(e) => setOctaves(Number(e.target.value))}
              min="1"
              max="10"
              step="1"
            />
          </div>
        </div>
      </div>
    </>
  )
}
