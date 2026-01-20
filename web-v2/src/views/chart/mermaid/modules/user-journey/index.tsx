import './index.less'
import { ScoreIcon } from './score-icon'

export default function UserJourney() {
  const conf = {
    type: 'journey',
    title: 'My working day',
    sections: [
      {
        title: 'Go to work',
        tasks: [
          { title: 'Make tea', score: 5, actors: ['Me'] },
          { title: 'Go upstairs', score: 3, actors: ['Me'] },
          { title: 'Do work', score: 1, actors: ['Me', 'Cat'] },
        ],
      },
      {
        title: 'Go home',
        tasks: [
          { title: 'Go downstairs', score: 1, actors: ['Me'] },
          { title: 'Sit down', score: 5, actors: ['Me'] },
        ],
      },
    ],
  }

  return (
    <div className="animation__mermaid-user-journey">
      <div className="animation__mermaid-user-journey-container">
        {/* <div className="animation__mermaid-user-journey-edge-box"></div> */}
        <div className="animation__mermaid-user-journey-node-box pl-5!">
          <h2 className="mb-2!">{conf.title}</h2>
          <div className="task-box flex flex-nowrap gap-10 relative">
            <svg className="h-3 w-full -bottom-4 absolute">
              <path
                stroke="#fff"
                strokeWidth="1px"
                d="M 0,5 550,5 550,2 558,5 550,8 550,5"
                fill="#fff"
              />
            </svg>
            {conf.sections.map((section, i: number) => {
              const { title, tasks } = section
              return (
                <div key={i} className="section">
                  <div className="section-title p-2! mb-2! text-[10px] text-center border border-white/30 rounded-sm">
                    {title}
                  </div>
                  <div className="task-box flex flex-nowrap gap-5">
                    {tasks.map((task, j: number) => {
                      const { title, score, actors } = task
                      return (
                        <div
                          key={j}
                          className="task text-[10px] text-center p-2! pl-3! pr-3! border border-white/30 rounded-sm relative"
                        >
                          {title}
                          <div className="score w-0 h-30 border-l-[0.5px] border-white/50 border-dashed absolute top-full left-[50%]">
                            <ScoreIcon
                              className="absolute -left-1.75 text-sm"
                              score={score}
                            />
                          </div>
                          {actors.map((actor, i: number) => (
                            <div
                              key={actor}
                              data-id={actor}
                              className="actor absolute w-2 h-2 rounded-2xl bg-green-300 -top-1"
                              style={{
                                left: 5 + i * 6,
                              }}
                            />
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
