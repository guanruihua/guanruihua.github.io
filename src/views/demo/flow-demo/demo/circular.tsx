import React from 'react'
import { Circular } from '..'
import { Docs } from 'aurad'

const nodes = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
  { id: '10' },
  { id: '11' },
  { id: '12' },
]

const links = [
  { form: '1', to: '5' },
  { form: '1', to: '9' },
  { form: '5', to: '9' },
  { form: '3', to: '7' },
  { form: '3', to: '11' },
  { form: '7', to: '11' },

  { form: '1', to: '2' },
  { form: '2', to: '3' },
  { form: '3', to: '4' },
  { form: '4', to: '5' },
  { form: '5', to: '6' },
  { form: '6', to: '7' },
  { form: '7', to: '8' },
  { form: '8', to: '9' },
  { form: '9', to: '10' },
  { form: '10', to: '11' },
  { form: '11', to: '12' },
  { form: '12', to: '1' },
]

export default () => {
  return (
    <Docs
      items={[
        {
          title: 'Circular',
          children: (
            <Circular
              nodes={nodes}
              links={links}
              nodeStyle={{
                width: 150 / 2,
                height: 150 / 2,
                padding: '2px 10px',
                background: '#fff',
                border: '1px solid #000',
              }}
            />
          ),
        },
      ]}
    />
  )
}
