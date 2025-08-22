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
  }>(
    {
      search: '',
      selects: [],
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

  return (
    <Container containerClassName="home">
      <div className="home-search">
        <input
          value={state.search}
          onChange={(e) => {
            const value = e.target.value

            setState({
              search: value,
            })
          }}
        />
      </div>
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
      <Guide guide={guide} state={state} />
    </Container>
  )
}
