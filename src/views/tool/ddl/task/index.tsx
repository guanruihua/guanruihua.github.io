import { isArray } from 'asura-eye'
import { Div } from 'aurad'
import React from 'react'
import { Title } from './title'
import { TASK } from './conf'
import { useState } from './hook'

export function Task() {
  const { timestamp, account, setAccount, state, setState } = useState()

  return (
    <div className="ddl-game-task">
      <div className="ddl-game-task-account">
        {account?.list?.map((item, i) => {
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
              {/* <div className="title">{title}</div> */}
              <Title
                value={title}
                cb={(newVal) => {
                  if (account?.list?.[i]?.[1]) {
                    account.list[i][1] = newVal
                    setAccount(account)
                  }
                }}
              />
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
