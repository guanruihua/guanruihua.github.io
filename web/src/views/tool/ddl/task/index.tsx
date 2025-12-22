import { isArray } from 'asura-eye'
import { Div } from 'aurad'
import React from 'react'
import { Title } from './title'
import { useState } from './hook'
import { Item } from './analysis-md'

export function Task() {
  const { timestamp, TASK, account, setAccount, state, setState } = useState()

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
      {TASK.map((item: Item) => {
        const { id, name, next = {} } = item
        return (
          <div key={id} className="ddl-game-task-item">
            <div className="title">{name}</div>
            <div className="week_task">
              {next['5hE5UU']?.map(({ id = '', name = '' }, j: number) => (
                <Div
                  key={j}
                  className={[
                    'week_task-item',
                    {
                      check: state?.[timestamp]?.includes(id),
                    },
                  ]}
                  onClick={() => {
                    if (isArray(state?.[timestamp])) {
                      if (state[timestamp].includes(id)) {
                        state[timestamp] = state[timestamp].filter(
                          (_) => _ !== id,
                        )
                      } else {
                        state[timestamp].push(id)
                      }
                    } else {
                      state[timestamp] = [id]
                    }
                    setState(state)
                  }}
                >
                  {name}
                </Div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
