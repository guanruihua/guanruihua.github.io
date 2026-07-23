import { Outlet } from 'react-router-dom'
import './style/var.css'
import './style/data.less'
import './style/index.css'
import './style/theme.less'
import './style/ui.less'
import './style/index.less'

import './style/title.less'

import { ConfigProvider } from 'antd'
import { theme } from 'antd'

export default function Layout() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#40cc70',
        },
      }}
    >
      <div className="layout" style={{ overflowX: 'hidden' }}>
        <Outlet />
      </div>
    </ConfigProvider>
  )
}
