import React from 'react'
import { Div } from 'aurad'
import { getConf } from './conf'
import './index.less'

export default () => {
  const { tasks, list } = getConf()

  return (
    <div className="container">
      <div className="ddl-timeline">
        {list.map((item, i) => {
          return (
            <Div
              key={i}
              className={[
                'ddl-timeline-item',
                { now: item.now, weekend: item.weekend },
              ]}
            >
              <div className="title">{item.title}</div>
              <div className="title time">{item.time}</div>
            </Div>
          )
        })}
      </div>
      <div className="ddl-task">
        {tasks.map((item, i) => {
          const { title, className, style } = item
          return (
            <Div key={i} className={['ddl-task-item', className]} style={style}>
              <div className="blank first" />
              <div className="ddl-task-item-render">
                <div className="start"></div>
                <div className="box">
                  <div className="title">{title}</div>
                </div>
                <div className="end"></div>
              </div>
              <div className="blank last" />
            </Div>
          )
        })}
      </div>
      <div className="ddl"></div>
    </div>
  )
}
