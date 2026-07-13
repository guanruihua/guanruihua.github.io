import React from 'react'

export type TagType = {
  value: string
  label?: React.ReactNode
  select?: boolean
  type?: 'success' | 'warning' | 'error' | 'default'
}
