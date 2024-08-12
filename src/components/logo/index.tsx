import React from 'react'
import { classNames } from 'harpe'
import './index.less'

export interface LogoProps {
  logo?: string | any
  label: string
  [key: string]: any
}
export const Logo = (props: LogoProps) => {
  const [status, setStatus] = React.useState<boolean>(false)

  const { logo, label } = props

  const getLogo = () => {
    if (logo && logo.indexOf('http') === -1) {
      return 'http://www.google.com/s2/favicons?domain=' + logo
    }
    return logo
  }

  return (
    <div className="logo-layout">
      <span className={classNames('logo-layout-label', { hidden: status })}>
        {label.slice(0, 1).toUpperCase()}
      </span>
      <span className={classNames('logo-layout-img', { hidden: !status })}>
        {logo && (
          <img src={getLogo()} alt="logo" onLoad={() => setStatus(true)} />
        )}
      </span>
    </div>
  )
}
