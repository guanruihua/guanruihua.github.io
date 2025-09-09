import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Management } from './management'
import { Conf } from './conf'
import './index.less'
import { scrollIntoView } from '@/util'

export default function () {
  const nav = useNavigate()

  return (
    <Management
      className="own-page-content"
      menu={[
        {
          title: 'Module',
          name: 'module',
          children: Conf,
        },
      ]}
      onChange={(name) => {
        if (location.hash !== '#/own') {
          nav('/own')
        }
        scrollIntoView('.module.' + name)
      }}
    >
      <Outlet />
    </Management>
  )
}
