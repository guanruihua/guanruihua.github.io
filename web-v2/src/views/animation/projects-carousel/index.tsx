import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()

  return (
    <div className="animation__projects-carousel">
      <div className="carousel-container">
        <div className="carousel-track">
          <div className="carousel-card">
            <div className="card-image-container">
              <img
                src="/image/t.jpg"
                alt="Synthwave City"
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3
                className="card-title text-xl font-bold text-cyan-400"
                data-text="Project Alpha"
              >
                Project Alpha
              </h3>
              <p className="card-description">
                Exploring the neon-drenched landscapes of a digital frontier.
                AI-driven procedural generation creates infinite cityscapes.
              </p>
              <div className="card-progress">
                <div className="progress-value" style={{ width: '65%' }} />
              </div>
              <div className="card-stats">
                <span>PHASE II</span>
                <span>65% COMPLETE</span>
              </div>
            </div>
            <div className="tech-details">
              <div className="tech-tag">Neural Networks</div>
              <div className="tech-tag">Voxel Systems</div>
              <div className="tech-tag">Quantum Rendering</div>
            </div>
          </div>
          <div className="carousel-card">
            <div>
              <div className="card-image-container">
                <img
                  src="/image/t2.jpg"
                  alt="Neuro Interface"
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3
                  className="card-title text-xl font-bold text-blue-400"
                  data-text="Neuro-Link UI"
                >
                  Neuro-Link UI
                </h3>
                <p className="card-description">
                  Designing intuitive interfaces for brain-computer interaction.
                  Holographic elements respond to neural patterns.
                </p>
                <div className="card-progress">
                  <div className="progress-value" style={{ width: '42%' }} />
                </div>
                <div className="card-stats">
                  <span>PHASE I</span>
                  <span>42% COMPLETE</span>
                </div>
              </div>
              <div className="tech-details">
                <div className="tech-tag">BCI Framework</div>
                <div className="tech-tag">Gesture Recognition</div>
                <div className="tech-tag">Thought Mapping</div>
              </div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card-image-container">
              <img
                src="/image/t3.jpg"
                alt="Quantum Core"
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3
                className="card-title text-xl font-bold text-purple-400"
                data-text="Quantum Entanglement"
              >
                Quantum Entanglement
              </h3>
              <p className="card-description">
                Visualizing complex quantum states through advanced rendering
                techniques. Real-time simulation of parallel realities.
              </p>
              <div className="card-progress">
                <div className="progress-value" style={{ width: '89%' }} />
              </div>
              <div className="card-stats">
                <span>PHASE III</span>
                <span>89% COMPLETE</span>
              </div>
            </div>
            <div className="tech-details">
              <div className="tech-tag">Q-Bit Architecture</div>
              <div className="tech-tag">Multiverse Modeling</div>
              <div className="tech-tag">Probability Fields</div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card-image-container">
              <img
                src="image/t5.jpg"
                alt="Orbital Station"
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3
                className="card-title text-xl font-bold text-amber-400"
                data-text="Project Chimera"
              >
                Project Chimera
              </h3>
              <p className="card-description">
                Developing next-gen propulsion systems for deep space
                exploration. Fusion drive concepts push beyond known physics.
              </p>
              <div className="card-progress">
                <div className="progress-value" style={{ width: '51%' }} />
              </div>
              <div className="card-stats">
                <span>PHASE II</span>
                <span>51% COMPLETE</span>
              </div>
            </div>
            <div className="tech-details">
              <div className="tech-tag">Dark Energy Capture</div>
              <div className="tech-tag">Plasma Containment</div>
              <div className="tech-tag">Gravitational Lensing</div>
            </div>
          </div>
          <div className="carousel-card">
            <div className="card-image-container">
              <img
                src="image/t4.jpg"
                alt="Data Stream"
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3
                className="card-title text-xl font-bold text-emerald-400"
                data-text="Aether Network"
              >
                Aether Network
              </h3>
              <p className="card-description">
                Building a decentralized data network leveraging quantum
                blockchain and next-gen P2P technology.
              </p>
              <div className="card-progress">
                <div className="progress-value" style={{ width: '78%' }} />
              </div>
              <div className="card-stats">
                <span>PHASE III</span>
                <span>78% COMPLETE</span>
              </div>
            </div>
            <div className="tech-details">
              <div className="tech-tag">Quantum Encryption</div>
              <div className="tech-tag">Self-Healing Nodes</div>
              <div className="tech-tag">Data Holograms</div>
            </div>
          </div>
        </div>
        <button className="carousel-button prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button className="carousel-button next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div className="carousel-indicators">
          <div className="indicator active" />
          <div className="indicator" />
          <div className="indicator" />
          <div className="indicator" />
          <div className="indicator" />
        </div>
      </div>
    </div>
  )
}
