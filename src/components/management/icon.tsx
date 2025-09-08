import React from 'react'

export const Fold = (props: React.HTMLAttributes<HTMLOrSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M19 5h-14" />
      <path d="M19 12h-9" />
      <path d="M19 19h-14" />
      <path d="M7 9l-3 3l3 3" />
    </g>
  </svg>
)
