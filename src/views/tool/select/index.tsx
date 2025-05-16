import React from 'react'
import './index.less'
import { useSetState } from '0hook'
import { classNames } from 'harpe'
import { Dialog } from 'aurad'
import { ObjectType } from '0type'

interface State {
  select: (string | number)[]
  open: boolean
  team: ObjectType[]
  teams: ObjectType[][]
  [key: string]: any
}

const defaultValue: State = {
  select: [],
  open: false,
  team: [{}, {}, {}, {}],
  teams: [],
}

export function SelectPage() {
  const [state, setState] = useSetState<State>(defaultValue, 'SelectPage-State')

  const list = new Array(100).fill('')

  return (
    <div className="select-page">
      {/* <Pages layout={Layout.Horizontal} /> */}
      <div className="select-page-team">
        {state.team?.map((item, i) => {
          const {} = item
          return (
            <div
              className="select-page-team-member"
              key={i}
              onClick={() => {
                setState({ open: true })
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
                />
              </svg>
            </div>
          )
        })}
      </div>
      <Dialog
        open={state.open}
        maskClosable
        onCancel={() => {
          setState({ open: false })
        }}
      >
        <div className="select-page-select-grid">
          {list.map((item, i) => {
            const id = i
            return (
              <div
                className={classNames('info-card', {
                  select: state.select?.includes(id),
                })}
                key={i}
                onClick={() => {
                  if (state.select?.includes(id)) {
                    state.select = state.select.filter((_) => _ !== id)
                  } else {
                    state.select?.push(id)
                  }
                  setState(state)
                }}
              >
                {i + 1}
              </div>
            )
          })}
        </div>
      </Dialog>
    </div>
  )
}
