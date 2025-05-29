import React from 'react'
import { Div, Docs } from 'aurad'
import './index.less'

export default function () {
  return (
    <Div className="study-svg">
      {/* <div className="bg"></div> */}
      <Docs
        items={[
          {
            title: '渐变',
            children: (
              <svg>
                <defs>
                  <linearGradient
                    id="gradient-test"
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={1}
                  >
                    <stop offset="0%" stopColor="#DCE35B" />
                    <stop offset="100%" stopColor="#45B649" />
                  </linearGradient>
                </defs>
                <rect
                  height="100"
                  width="150"
                  fill="url(#gradient-test)"
                ></rect>
              </svg>
            ),
          },
          {
            title: '渐变文字',
            children: (
              <svg width="600" height="270">
                <defs>
                  {/* <!--背景渐变色--> */}
                  <linearGradient id="background">
                    <stop offset="0%" stopColor="#232526" />
                    <stop offset="100%" stopColor="#414345" />
                  </linearGradient>
                  {/* <!--文字渐变色--> */}
                  <linearGradient
                    id="text-color"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#DCE35B" />
                    <stop offset="100%" stopColor="#45B649" />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  height="100%"
                  width="100%"
                  fill="url(#background)"
                ></rect>
                <text y="28%" x="28%">
                  试问闲情都几许？
                </text>
                <text y="44%" x="28%">
                  一川烟草
                </text>
                <text y="60%" x="28%">
                  满城风絮
                </text>
                <text y="76%" x="28%">
                  梅子黄时雨
                </text>
              </svg>
            ),
          },
          
        ]}
      />
    </Div>
  )
}
