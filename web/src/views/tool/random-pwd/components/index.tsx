import React from 'react'

export const InputNumber = ({ name, onChange, ...rest }: any) => {
  return (
    <input
      type="number"
      maxLength={4}
      min={1}
      max={9999}
      onChange={(e: any) => onChange?.(Number(e.target.value) ?? 1)}
      {...rest}
    />
  )
}

export const Input = ({ name, onChange, ...rest }: any) => {
  return (
    <input
      type="text"
      maxLength={999}
      onChange={(e: any) => onChange?.(e.target.value ?? '')}
      {...rest}
    />
  )
}
