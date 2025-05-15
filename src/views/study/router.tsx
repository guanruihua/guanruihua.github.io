import React from 'react'
import { Study } from '.'
import { CSS_Flex } from './css-flex'
import { FontStroke } from './font-stroke'
import { Dev } from './Dev'
import { CSS_Grid } from './css-grid'

export const StudyRouter = {
  path: '/study',
  element: <Study />,
  children: [
    {
      path: 'css-flex',
      name: 'CSS flex',
      element: <CSS_Flex />,
    },
    {
      path: 'css-grid',
      name: 'grid',
      element: <CSS_Grid />,
    },
    {
      path: 'font-stroke',
      name: 'Font Stroke',
      element: <FontStroke />,
    },
    {
      path: 'dev',
      element: <Dev />,
    },
  ],
}
