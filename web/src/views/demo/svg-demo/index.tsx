import React from 'react'
import { Div, Docs, Flex } from 'aurad'
import './index.less'

export default function () {
  return (
    <Div className="study-svg-demo">
      <Docs
        items={[
          {
            title: 'Demo',
            children: (
              <Flex column>
                <svg className="demo2" height="0" width="0">
                  <symbol id="beats" viewBox="0 0 100 100">
                    <line
                      className="beat"
                      x1="15"
                      y1="40"
                      x2="15"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                    ></line>
                    <line
                      className="beat"
                      x1="50"
                      y1="40"
                      x2="50"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                    ></line>
                    <line
                      className="beat"
                      x1="85"
                      y1="40"
                      x2="85"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                    ></line>
                  </symbol>
                </svg>

                <span
                  style={{
                    color: '#ff6699',
                    border: '1px solid #ff6699',
                    borderRadius: 5,
                    paddingLeft: 5,
                    fontSize: 24,
                  }}
                >
                  <svg height="30" width="30">
                    <use href="#beats"></use>
                  </svg>
                  <span>Loading...</span>
                </span>

                <div>
                  <svg className="demo3" height="0" width="0">
                    <symbol id="demo-clock" viewBox="-52 -52 104 104">
                      <circle
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeMiterlimit="10"
                        cx="0"
                        cy="0"
                        r="48"
                      />
                      <line
                        className="fast-hand"
                        fill="none"
                        strokeLinecap="round"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeMiterlimit="10"
                        x1="0"
                        y1="0"
                        x2="35"
                        y2="0.5"
                      ></line>
                      <line
                        className="slow-hand"
                        fill="none"
                        strokeLinecap="round"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeMiterlimit="10"
                        x1="0"
                        y1="0"
                        x2="-0.5"
                        y2="-24"
                      ></line>
                    </symbol>
                  </svg>
                  <div style={{ color: '#fa8919', fontSize: 16 }}>
                    <svg
                      height="26"
                      width="26"
                      style={{
                        verticalAlign: 'top',
                        marginTop: -2,
                        marginRight: 3,
                        color: '#fa8919',
                      }}
                    >
                      <use href="#demo-clock"></use>
                    </svg>
                    <span>Loading...</span>
                  </div>
                </div>
              </Flex>
            ),
          },
        ]}
      />
    </Div>
  )
}
