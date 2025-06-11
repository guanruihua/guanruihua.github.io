import React from 'react'
import { Container } from '@/components'
import { useSetState } from '0hook'
import { useFetchMDState } from '@/hook'
import { Guide } from './guide'
import './index.less'
import { isArray, isString } from 'asura-eye'
import { Div } from 'aurad'
import { analysisMD } from './analysis-md'

const BGColor = [
  'radial-gradient(ellipse at right top, #5756CD 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #a63d2a82 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #8FA918 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #107667ed 0%, #151419 47%, #151419 100%)',
  'radial-gradient(ellipse at right top, #00458f8f 0%, #151419 45%, #151419 100%)',
  'radial-gradient(ellipse at right top, #F8D0D9 0%, #151419 45%, #151419 100%)',
]

export default function Home() {
  const [md] = useFetchMDState('/guide.md')
  const [types, guide] = analysisMD(md)
  const [state, setState] = useSetState<{ selects: string[] }>(
    {
      selects: [],
    },
    'cache-guide-state',
  )

  const handleClick = (name: string) => {
    if (!isArray(state.selects)) {
      state.selects = []
    }
    if (state.selects.includes(name)) {
      state.selects = state.selects.filter((_) => _ !== name)
    } else {
      state.selects.push(name)
    }
    setState(state)
  }

  // console.log(guide)

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
            onClick={() => handleClick(name)}
          >
            <div className="logo">{name.slice(0, 1)}</div>
            <div className="name">{name}</div>
          </Div>
        ))}
      </div>
      <Guide guide={guide} state={state} />
    </Container>
  )
}
