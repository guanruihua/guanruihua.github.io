import { Outlet } from 'react-router-dom'
import './theme.less'
import './ui.less'
import './index.less'
import './index.css'

export default function Layout() {

  return (
    <div className="layout" style={{ overflowX: 'hidden' }}>
      <Outlet />
    </div>
  )
}
