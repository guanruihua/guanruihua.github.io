import { Container } from '@/components'
import React from 'react'
import { Outlet } from 'react-router'

export function DevPage() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}
