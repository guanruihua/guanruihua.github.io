import React from 'react'
import './index.less'

export default function () {
  return (
    <div className='scroll-snap'>
      <section style={{ backgroundColor: 'rgb(8, 163, 5)' }}>1</section>
      <section style={{ backgroundColor: 'rgb(255, 0, 51)' }}>2</section>
      <section style={{ backgroundColor: 'rgb(0, 34, 255)' }}>3</section>
      <section style={{ backgroundColor: 'rgb(255, 123, 0)' }}>4</section>
      <section style={{ backgroundColor: 'rgb(57, 60, 60)' }}>5</section>
    </div>
  )
}
