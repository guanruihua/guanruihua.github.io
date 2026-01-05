import './index.css'
import './theme.less'
import './ui.less'
import './index.less'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
    <div className="layout" style={{ overflowX: 'hidden' }}>
      <Outlet />
    </div>
  )
}
