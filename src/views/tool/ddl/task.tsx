const TASK = [
  {
    id: 'ys',
    title: '原神',
    week_task: [
      '1-周本Boss三次',
      '2-须臾树脂',
      '3-质变仪',
      '4-晶蝶采集',
      '5-爱可菲做饭',
    ],
  },
  {
    id: 'sr',
    title: '崩坏星穹铁道',
    week_task: ['1-模拟宇宙', '2-周本Boss三次'],
  },
  {
    id: 'zzz',
    title: '绝区零',
    week_task: ['1-空洞', '2-周本Boss三次'],
  },
]

import { useSetState } from '0hook'
import { isArray } from 'asura-eye'
import { Div } from 'aurad'
import dayjs from 'dayjs'
import React from 'react'

export function Task() {
  const weekStartTime = dayjs().startOf('week').add(1, 'day').add(4, 'h')
  // .format('YYYY-MM-DD HH:mm:ss')
  const timestamp = weekStartTime.valueOf()

  const [account, setAccount] = useSetState<{
    selectId: string
    id: string
    name: string
    list: [string, string][]
  }>(
    {
      selectId: 'own',
      id: 'own',
      name: 'Own',
      list: [
        ['own', 'Own'],
        ['1', 'Account 1'],
        ['2', 'Account 2'],
      ],
    },
    'ddl-game-task-account',
  )

  const [state, setState] = useSetState<{
    [key: string]: string[]
  }>(
    {
      [timestamp]: [],
    },
    'ddl-game-task',
  )

  console.log(weekStartTime.format('YYYY-MM-DD HH:mm:ss'), timestamp)

  return (
    <div className="ddl-game-task">
      <div className="ddl-game-task-account">
        {account?.list?.map((item) => {
          const [id, title] = item
          return (
            <Div
              key={id}
              className={[
                'ddl-game-task-account-item',
                {
                  select: account.selectId === id,
                },
              ]}
              onClick={() => {
                setAccount({ selectId: id })
              }}
            >
              <div className="title">{title}</div>
            </Div>
          )
        })}
      </div>
      {TASK.map((item) => {
        const { id, title, week_task } = item
        return (
          <div key={id} className="ddl-game-task-item">
            <div className="title">{title}</div>
            <div className="week_task">
              {week_task.map((weekTaskItem, j) => {
                const [_id, name] = weekTaskItem.split('-')
                const uid = account.selectId + '-' + id + '-' + _id

                return (
                  <Div
                    key={j}
                    className={[
                      'week_task-item',
                      {
                        check: state?.[timestamp]?.includes(uid),
                      },
                    ]}
                    onClick={() => {
                      if (isArray(state?.[timestamp])) {
                        if (state[timestamp].includes(uid)) {
                          state[timestamp] = state[timestamp].filter(
                            (_) => _ !== uid,
                          )
                        } else {
                          state[timestamp].push(uid)
                        }
                      } else {
                        state[timestamp] = [uid]
                      }
                      setState(state)
                    }}
                  >
                    {name}
                  </Div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
