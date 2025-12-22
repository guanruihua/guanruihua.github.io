import React from 'react'
import { Conf, State } from './type'
import { todoFilter } from './util'
import { getLabel } from './conf'

export interface TodoProps {
  state: Partial<State>
  [key: string]: any
}

export function Todo(props: TodoProps) {
  const { state = {} } = props
  const { todo = [] } = state

  const [today, setToday] = React.useState<Conf[]>([])

  React.useEffect(() => {
    setToday(todo?.filter(todoFilter))
  }, [state.lastUpdate])

  return (
    <div className="todo-container">
      {/* <h3>Today</h3>
      <div className="todo">
        {today.map((item) => (
          <div className="todo-item" key={item.id}>
            <div className="desc">{item.desc}</div>
            <div className="tag">
              <div className="frequency">
                {getLabel.Frequency(item.frequency)}
              </div>
              <div className="time-frequency">
                {getLabel.TimeFrequency(item.timeFrequency)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3>All</h3> */}
      <div className="todo">
        {todo?.map((item) => (
          <div className="todo-item" key={item.id}>
            <div className="desc">{item.desc}</div>
            <div className="tag">
              <div className="frequency">
                {getLabel.Frequency(item.frequency)}
              </div>
              <div className="time-frequency">
                {getLabel.TimeFrequency(item.timeFrequency)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
