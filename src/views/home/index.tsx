import React from 'react'
import { Container } from '@/components'
import { useSetState } from '0hook'
import { useFetchMDState } from '@/hook'
import { Guide } from './guide'
import './index.less'
import { isArray, isString } from 'asura-eye'
import { Div } from 'aurad'
import { analysisMD } from './analysis-md'
import { SOURCEURL } from '@/assets'
import { classNames } from 'harpe'

const BGColor = [
  'radial-gradient(ellipse at right top, #5756CD 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #a63d2a82 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #8FA918 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #107667ed 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #00458f8f 0%, #151419 45%, #151419 100%)',
  'radial-gradient(ellipse at right top, #F8D0D9 0%, #151419 45%, #151419 100%)',
]

export default function Home() {
  const [md] = useFetchMDState(SOURCEURL + 'guide.md')
  const [types, guide] = analysisMD(md)
  const [state, setState] = useSetState<{
    search: string
    selects: string[]
    showKeyBoard: boolean
  }>(
    {
      search: '',
      selects: [],
      showKeyBoard: false,
    },
    'cache-guide-state',
  )

  const handleClick = (name: string, only: boolean = false) => {
    if (!isArray(state.selects)) {
      state.selects = []
    }
    if (only) {
      if (state.selects.includes(name) && state.selects.length === 1) {
        state.selects = []
      } else {
        state.selects = [name]
      }
    } else {
      if (state.selects.includes(name)) {
        state.selects = state.selects.filter((_) => _ !== name)
      } else {
        state.selects.push(name)
      }
    }
    setState(state)
  }

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ]

  return (
    <Container containerClassName="home">
      <div className="layout">
        {types?.map((name: any, i: number) => (
          <Div
            key={i}
            className={[
              'card',
              {
                select: isString(name) && state.selects?.includes(name),
              },
            ]}
            style={{
              background: BGColor[i % BGColor.length],
            }}
          >
            <div
              className="bg"
              style={{
                background: 'url(/image/bg.png)',
              }}
              onClick={() => handleClick(name)}
            />
            <div className="logo">{name.slice(0, 1)}</div>
            <div
              className="name"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleClick(name, true)
              }}
            >
              {name}
            </div>
          </Div>
        ))}
      </div>
      <div className="home-search">
        <div className="home-search-box">
          <input
            value={state.search}
            onChange={(e) => {
              const value = e.target.value

              setState({
                search: value,
              })
            }}
          />
          <svg
            className="home-search-reset"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 21 21"
            onClick={() =>
              setState({
                search: '',
                selects: [],
              })
            }
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path>
              <path d="M7.5 6.5h-4v-4"></path>
            </g>
          </svg>
          <svg
            className={classNames('home-search-keyboard', {
              showKeyBoard: state.showKeyBoard,
            })}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            onClick={() =>
              setState({
                showKeyBoard: !state.showKeyBoard,
              })
            }
          >
            <path
              fill="currentColor"
              d="M4 19q-.825 0-1.412-.587T2 17V7q0-.825.588-1.412T4 5h16q.825 0 1.413.588T22 7v10q0 .825-.587 1.413T20 19zm4-3h8v-2H8zm-3-3h2v-2H5zm3 0h2v-2H8zm3 0h2v-2h-2zm3 0h2v-2h-2zm3 0h2v-2h-2zM5 10h2V8H5zm3 0h2V8H8zm3 0h2V8h-2zm3 0h2V8h-2zm3 0h2V8h-2z"
            ></path>
          </svg>
        </div>
        <Div className="home-keyboard-box" none={!state.showKeyBoard}>
          {keyboardRows.map((row, i) => {
            return (
              <div className="home-keyboard-box-row" key={i}>
                {row.map((key) => {
                  return (
                    <div
                      className="home-keyboard-box-cell"
                      data-key={key}
                      key={key}
                      onClick={() => {
                        setState({
                          search: (state.search || '') + key.toLowerCase(),
                        })
                      }}
                    >
                      {key}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </Div>
      </div>
      <Guide guide={guide} state={state} />
    </Container>
  )
}
