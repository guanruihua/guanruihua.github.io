import React from 'react'
import { Div } from 'aurad'
import './index.less'
import { usePageState } from './hook'

export default () => {
  const { state, startTime, ft, now } = usePageState()

  return (
    <div className="tool-ddl-container">
      <div className="days-grid">
        {new Array(12).fill('').map((_, i: number) => {
          const M = i
          const time = startTime.set('M', M)
          const len = time.daysInMonth()
          // console.log(M, len, time.day())
          const offset = time.day() > 0 ? time.day() - 1 : 6
          return (
            <Div className="M-cell" key={i}>
              <h3>{time.format('YYYY MM')}</h3>
              <div className="layout">
                {['一', '二', '三', '四', '五', '六', '日'].map((val, j) => (
                  <div key={'timeline' + j} className="day-cell timeline">
                    {val}
                  </div>
                ))}
                {new Array(offset).fill('').map((_, j) => (
                  <div key={'s' + j} className="day-cell space"></div>
                ))}
                {new Array(len).fill('').map((_, j) => {
                  const D = j + 1
                  const ownTime = time.set('D', D)
                  const value = ownTime.format('D')
                  const target = ownTime.format(ft)
                  const holiday = state.holiday?.includes(target)
                  const adjustmentDay = state.adjustmentDay?.includes(target)
        
                  return (
                    <Div
                      key={j}
                      className="day-cell"
                      classNames={{
                        today: now.isSame(ownTime, 'D'),
                        weekend: [0, 6].includes(ownTime.day()),
                        holiday,
                        adjustmentDay,
                      }}
                    >
                      {value}
                    </Div>
                  )
                })}
              </div>
            </Div>
          )
        })}
        {/* {allDays.map((day, index) => {
          const obj = dayjs(day)
          // console.log(obj.get(''))
          const time = obj.format('MM/DD')
          return (
            <Div
              key={index}
              className="day-cell"
              classNames={{
                weekend: [0, 6].includes(obj.day()),
              }}
            >
              {time}
            </Div>
          )
        })} */}
      </div>
      {/* <div className="ddl-timeline">
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
      <div className="ddl"></div> */}
      {/* <Task /> */}
    </div>
  )
}
