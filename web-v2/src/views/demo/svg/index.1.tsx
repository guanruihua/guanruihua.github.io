import React from 'react'

export default function () {
  return (
    <div className="study-svg">
      {/* Tabs */}
      {/* Disclosure */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={314}
        height={157}
        viewBox="0 0 314 157"
        className="w-full"
      >
        <rect
          width="314"
          height="157"
          fill="url(#disclosure_card__a_undefined)"
          rx="12"
        ></rect>
        <g filter="url(#disclosure_card__b_undefined)">
          <rect width="160" height="88" x="77" y="34" fill="#fff" rx="8"></rect>
        </g>
        <path
          stroke="#D1D5DB"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="m226 48.5-2-2-2 2M222 89.5l2 2 2-2M222 110.5l2 2 2-2"
        ></path>
        <path fill="#F3F4F6" d="M77 80h160v1H77zM77 101h160v1H77z"></path>
        <path
          stroke="#4B5563"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M89 48h60"
        ></path>
        <path
          stroke="#D1D5DB"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M89 58h116M89 68h92"
        ></path>
        <path
          stroke="#4B5563"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M89 91h76M89 112h52"
        ></path>
        <defs>
          <linearGradient
            id="disclosure_card__a_undefined"
            x1="0"
            x2="314.69"
            y1="0"
            y2="1.396"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#D946EF"></stop>
            <stop offset="1" stop-color="#9333EA"></stop>
          </linearGradient>
          <filter
            id="disclosure_card__b_undefined"
            width="190"
            height="118"
            x="62"
            y="27"
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dy="3"></feOffset>
            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dy="8"></feOffset>
            <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
            <feBlend
              in2="effect1_dropShadow"
              result="effect2_dropShadow"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect2_dropShadow"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  )
}
