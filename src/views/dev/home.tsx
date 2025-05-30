import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { conf } from './conf'
import { Card, Guide, GuideProps } from '@/components'
import { useFetchArrayState } from '@/hook'

export function DevHomePage() {
  const nav = useNavigate()
  const [guide] = useFetchArrayState<GuideProps[]>('/dev-guide.json')

  const handleClick = (name: string, url?: string) => {
    if (url) {
      return window.open(url, '_blank')
    } else nav(name)
  }
  return (
    <div className="dev-page">
      <div className="layout">
        {conf.map(([name, label, style, url], i) => {
          return (
            <Card
              key={i}
              label={label}
              style={style as any}
              onClick={() => handleClick(name, url)}
            />
          )
        })}
      </div>
      <Guide guide={guide || []} />
    </div>
  )
}
