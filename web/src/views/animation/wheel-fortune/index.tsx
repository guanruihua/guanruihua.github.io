import React from 'react'
import {
  ChevronDownIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'
import clsx from 'clsx'
import { f1, f2, f3, f4, items } from './conf'
import { useLoadJS } from '@/hook'
import './index.less'

// https://codepen.io/dilums/pen/azvYdbj?editors=0010

function Roll() {
  return (
    <svg
      className="absolute  inset-0"
      viewBox="0 0 2000 2000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_9_42" fill="white">
        <path d="M1922 1005C1922 1514.21 1509.21 1927 1000 1927C490.793 1927 78 1514.21 78 1005C78 495.793 490.793 83 1000 83C1509.21 83 1922 495.793 1922 1005ZM471.592 1005C471.592 1296.83 708.168 1533.41 1000 1533.41C1291.83 1533.41 1528.41 1296.83 1528.41 1005C1528.41 713.168 1291.83 476.592 1000 476.592C708.168 476.592 471.592 713.168 471.592 1005Z" />
      </mask>
      <path
        d="M1922 1005C1922 1514.21 1509.21 1927 1000 1927C490.793 1927 78 1514.21 78 1005C78 495.793 490.793 83 1000 83C1509.21 83 1922 495.793 1922 1005ZM471.592 1005C471.592 1296.83 708.168 1533.41 1000 1533.41C1291.83 1533.41 1528.41 1296.83 1528.41 1005C1528.41 713.168 1291.83 476.592 1000 476.592C708.168 476.592 471.592 713.168 471.592 1005Z"
        style={{
          fill: '#272b35e8',
          stroke: '#3d445291',
          strokeWidth: '13px',
        }}
        mask="url(#path-1-inside-1_9_42)"
      />

      <g id="roll">
        <g transform="translate(1000, 1000)">
          {f1.map((i, idx) => (
            <React.Fragment key={idx}>
              <path
                d={i}
                style={{
                  fill: '#343a46c2',
                  stroke: '#444c59c2',
                  strokeWidth: '6',
                }}
              />
            </React.Fragment>
          ))}

          {f3.map(([path, id], idx) => (
            <React.Fragment key={idx}>
              <path d={path} stroke={'none'} strokeWidth={5} id={id} />
              <text dy={20} className="circ-title">
                <textPath
                  xlinkHref={`#${id}`}
                  textAnchor="middle"
                  startOffset={'50%'}
                  style={{ textAnchor: 'middle' }}
                >
                  {items[idx].title}
                </textPath>
              </text>
            </React.Fragment>
          ))}

          {f4.map(([path, id], idx) => (
            <React.Fragment key={idx}>
              <path d={path} stroke={'none'} strokeWidth={5} id={id} />
              <text dy={16} className="circl-desc">
                <textPath
                  xlinkHref={`#${id}`}
                  textAnchor="middle"
                  startOffset={'50%'}
                  style={{ textAnchor: 'middle' }}
                >
                  {items[idx].dropRate}% drop rate
                </textPath>
              </text>
            </React.Fragment>
          ))}

          {f2.map(({ x, y, rt, image }, idx) => (
            <React.Fragment key={idx}>
              <g transform={`translate(${x - 90},${y - 90} )`}>
                <g transform={`rotate(${rt}, 90, 90)`}>
                  <image
                    href={image}
                    height="180"
                    width="180"
                    className="scale-on-hover"
                  />
                </g>
              </g>
            </React.Fragment>
          ))}
        </g>
      </g>
      <g filter="url(#filter0_d_28_19)">
        <path
          d="M729.884 144.395C907.122 88.7643 1097.26 89.2052 1274.29 145.717L1274.76 145.872C1284.34 149.202 1289.59 159.486 1286.73 169.18L1286.59 169.648L1199.04 440.732C1195.86 450.593 1185.44 455.981 1175.66 453.146L1175.2 453.005C1062.09 417.106 940.707 416.827 827.473 452.165L824.799 453.007C815.044 456.103 804.522 450.918 801.109 441.2L800.952 440.734L713.403 169.651C710.179 159.666 715.663 148.924 725.7 145.72L729.884 144.395ZM1252.1 172.325C1087.72 122.557 912.272 122.559 747.895 172.328L827.473 418.729C876.16 404.401 926.189 396.267 976.399 394.327C976.597 393.926 976.852 393.537 977.176 393.174L996.768 371.189C998.756 368.958 1002.24 368.958 1004.23 371.189L1023.82 393.174C1024.16 393.549 1024.42 393.951 1024.62 394.366C1074.49 396.376 1124.16 404.497 1172.52 418.728L1252.1 172.325Z"
          fill="url(#paint0_linear_28_19)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_28_19"
          x="708.079"
          y="98.6"
          width="593.833"
          height="369.701"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="5" />
          <feGaussianBlur stdDeviation="4.7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_28_19"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_28_19"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_28_19"
          x1="999.996"
          y1="103"
          x2="999.996"
          y2="453.901"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8D919C" />
          <stop offset="1" stopColor="#4F5563" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function CustomBellIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
        fill="currentColor"
      />
    </svg>
  )
}

function CustomSendIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_8)">
        <path
          d="M11.446 25.782l8.479-21.207-21.207 8.479 4.943 4.956 12.021-9.192-9.192 12.02 4.956 4.944z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_8">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function CustomBellIcon2({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 013.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 013.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z"
        fill="currentColor"
      />
    </svg>
  )
}

function FriendsIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 000 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0020 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"
        fill="currentColor"
        fillOpacity={0.54}
      />
    </svg>
  )
}

function BallIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95a8.01 8.01 0 014.38 3.34l-.39 1.34-1.35.46L13 6.7V5.3zm-3.35-.95L11 5.3v1.4L7.01 9.49l-1.35-.46-.39-1.34a8.103 8.103 0 014.38-3.34zM7.08 17.11l-1.14.1A7.938 7.938 0 014 12c0-.12.01-.23.02-.35l1-.73 1.38.48 1.46 4.34-.78 1.37zm7.42 2.48c-.79.26-1.63.41-2.5.41-.87 0-1.71-.15-2.5-.41l-.69-1.49.64-1.1h5.11l.64 1.11-.7 1.48zM14.27 15H9.73l-1.35-4.02L12 8.44l3.63 2.54L14.27 15zm3.79 2.21l-1.14-.1-.79-1.37 1.46-4.34 1.39-.47 1 .73c.01.11.02.22.02.34 0 1.99-.73 3.81-1.94 5.21z"
        fill="currentColor"
      />
    </svg>
  )
}

function PawIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM9 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM15 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"
        fill="currentColor"
      />
    </svg>
  )
}

function FlowerIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22a9 9 0 009-9 9 9 0 00-9 9zM5.6 10.25a2.5 2.5 0 003.92 2.06l-.02.19a2.5 2.5 0 005 0l-.02-.19c.4.28.89.44 1.42.44a2.5 2.5 0 002.5-2.5c0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25a2.5 2.5 0 00-3.92-2.06l.02-.19a2.5 2.5 0 00-5 0l.02.19c-.4-.28-.89-.44-1.42-.44a2.5 2.5 0 00-2.5 2.5c0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5a2.5 2.5 0 010 5 2.5 2.5 0 010-5zM3 13a9 9 0 009 9 9 9 0 00-9-9z"
        fill="currentColor"
      />
    </svg>
  )
}

function Nav() {
  return (
    <>
      <div className="bg-[#31353e] text-[#393f4d] border-b border-b-[#3b4253]  fixed inset-x-0 top-0  h-14 flex items-center px-4 ">
        <img
          src="https://assets.codepen.io/3685267/wheel-of-fortune-fxjdpdcn.png"
          alt=""
          className="size-11 object-center object-cover shrink-0 "
        />
        <span className="shrink-0 ml-1 uppercase font-bold text-lg text-white">
          Wager
        </span>
        <div className="grow inline-flex items-center pl-10 ">
          <div className="bg-[#25282f] text-[#94979c] border-[2px] border-[#404859e5]  inline-flex items-center h-9  rounded-full ">
            <div className="inline-flex items-center h-9  px-4  rounded-full -ml-1  border-[2px] border-[#474e5e] ">
              <PawIcon className="size-5 text-[#4f68ff]" />
              <div className="ml-2 text-white font-semibold">Royal</div>
            </div>
            <div className="inline-flex items-center px-4  ">
              <BallIcon className="size-5 text-[#38404d]" />
              <div className="ml-2 font-semibold">Gambling</div>
            </div>
          </div>
          <div className="ml-10 relative hidden lg:block">
            <input
              type="text"
              placeholder="Search for Games"
              className="w-64 focus:outline-none pr-2 pl-3 h-10 rounded-full  focus:border-2 focus:border-zinc-600 caret-zinc-400 bg-[#25282f] text-[#94979c] border-[2px] border-[#404859e5]  font-semibold"
            ></input>
            <div className="size-10 absolute top-0 right-0 grid place-items-center text-[#94979c] ">
              <SearchIcon className="size-5 " />
            </div>
          </div>
        </div>
        <div className="inline-flex items-center shrink-0 ">
          <div className="border-[2px] border-[#474e5e]  size-9 rounded-full  grid place-items-center ">
            <CustomBellIcon className="size-5 text-[#94979c] " />
          </div>
          <div className="inline-flex items-center text-xs pl-2 pr-6 h-9 rounded-full relative ml-4  bg-[#25282f] text-[#94979c] border-[2px] border-[#404859e5] ">
            <img
              src="https://assets.codepen.io/3685267/wheel-of-fortune-aetkeerk.png"
              alt=""
              className="size-7 object-center object-cover "
            />
            <div className="ml-2 text-base font-semibold">
              <span className="text-white">0.</span>
              0000
            </div>
            <div className="absolute size-6 top-1/2  -translate-y-1/2 -right-2.5  transform rounded-md grid place-items-center plus-icon-bg">
              <PlusIcon className="size-4 text-white" />
            </div>
          </div>
          <img
            src="https://assets.codepen.io/3685267/wheel-of-fortune-tvcbwknt.png"
            alt=""
            className="size-10 object-center object-cover rounded-full ml-8  bg-[#25282f] text-[#94979c] border-[2px] border-[#404859e5]  "
          />
          <ChevronDownIcon className="size-5 ml-2 text-white" />
        </div>
      </div>
    </>
  )
}

function SidebarLeft() {
  return (
    <>
      <div className="px-4 w-64 fixed inset-y-0 left-0  pt-16 bg-[#242834] hidden xl:block">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">Royal Game</span>
          <span className="border border-[#3f4453]  px-2 py-0.5 rounded-full text-[#9198ae] ">
            Edit
          </span>
        </div>
        <div className="flex flex-col  space-y-3 mt-2 ">
          {[
            {
              title: 'Home Page',
              image:
                'https://assets.codepen.io/3685267/wheel-of-fortune-xvtrdzgw.png',
            },
            {
              title: 'Duel Arena',
              image:
                'https://assets.codepen.io/3685267/wheel-of-fortune-bjjsgsee.png',
            },
            {
              title: 'Royal Roulette',
              image:
                'https://assets.codepen.io/3685267/wheel-of-fortune-smzxdvfg.png',
            },
            {
              title: 'Chest Battle',
              image:
                'https://assets.codepen.io/3685267/wheel-of-fortune-zileulop.png',
              selected: true,
            },
          ].map(({ title, image, selected }, idx) => (
            <React.Fragment key={idx}>
              <div
                className={clsx(selected && 'bg-[#8291f2] pt-0.5')}
                style={{ borderRadius: '6px' }}
              >
                <div
                  className={clsx(
                    'flex items-center px-1 py-1 rounded-md  ',
                    selected
                      ? 'menu-items-selected text-white'
                      : 'bg-[#1d212c] text-[#93969d]',
                  )}
                >
                  <img
                    src={image}
                    alt=""
                    className="size-8 object-center object-cover "
                  />
                  <div className="ml-2 font-semibold">{title}</div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="py-4 mt-5 border-t-[2px] border-t-[#3a3f4f] border-b-[2px] border-b-[#3a3f4f] ">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Custom Features</span>
            <span className="border  border-[#3f4453]  size-6 rounded-full grid place-items-center  ">
              <PlusIcon className="size-4  text-[#9198ae]  " />
            </span>
          </div>
          <div
            className="bg-[#3b4252] pt-0.5 mt-2"
            style={{ borderRadius: '6px' }}
          >
            <div className="rounded-md px-2 py-4 bg-[#2e3442]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center ">
                  <FriendsIcon className="size-5 text-[#9fa4b0] " />
                  <span className="ml-2 ">Friends</span>
                </div>
                <div className="inline-flex items-center -space-x-1.5 ">
                  <img
                    src="https://assets.codepen.io/3685267/wheel-of-fortune-evsxajkr.png"
                    alt=""
                    className="size-6 object-center object-cover rounded-full "
                  />
                  <img
                    src="https://assets.codepen.io/3685267/wheel-of-fortune-pskhfbpn.png"
                    alt=""
                    className="size-6 object-center object-cover rounded-full "
                  />
                  <img
                    src="https://assets.codepen.io/3685267/wheel-of-fortune-jctiffhg.png"
                    alt=""
                    className="size-6 object-center object-cover rounded-full "
                  />
                  <div className="bg-[#1f232e] size-6 rounded-full text-xs grid place-items-center ">
                    +3
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-3 ">
                <CustomBellIcon2 className="size-5 text-[#9fa4b0] " />
                <span className="ml-2 ">Notification</span>
              </div>

              <div className="flex items-center mt-3 ">
                <FlowerIcon className="size-5 text-[#9fa4b0] " />
                <span className="ml-2 ">Rewards</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  space-y-2 mt-4 ">
          <span className="font-semibold text-white">
            Additional Information
          </span>
          <span className="text-xs  text-[#9198ae]  ">Daily Tasks</span>
          <div className="flex items-center  text-[#9198ae]  ">
            <span className="text-xs ">Wager Docs</span>
            <ExternalLinkIcon className="size-4 ml-2 " />
          </div>
        </div>
      </div>
      <div className="w-64 fixed bottom-0 px-4 pb-6 text-xs hidden xl:block">
        <div className="flex items-center  text-[#9198ae]  ">
          <span className=" ">About</span>
          <div className="px-2 inline-flex  items-center before:translate-y-0.5 transform before:size-1.5 before:bg-[#656977] before:mr-2 before:rounded-full ">
            Discord
          </div>
          <div className="px-2 inline-flex  items-center before:translate-y-0.5 transform before:size-1.5 before:bg-[#656977] before:mr-2 before:rounded-full ">
            Twitter
          </div>
        </div>
        <div className="text-xs mt-2  text-[#9198ae]  ">
          Copyright(c) <span className="">Oriflow Design</span>All rights
          Reserved
        </div>
      </div>
    </>
  )
}

function SidebarRight() {
  return (
    <>
      <div className="fixed top-16 right-4  bottom-4  w-64 rounded-md  flex flex-col bg-[#282c37] hidden xl:flex">
        <div className="px-3 pt-3">
          <div className="flex items-center justify-between shrink-0 border-b-[2px] border-b-[#414653]  pb-2">
            <span className="flex items-center  transform before:size-2.5 before:bg-[#2cc3f0] before:mr-2 before:rounded-full font-semibold ">
              Royal Chat
            </span>
            <span className="">Edit</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 shrink-0 ">
          <span className="font-semibold">Members :</span>
          <div className="inline-flex items-center -space-x-1.5 ">
            <img
              src="https://assets.codepen.io/3685267/wheel-of-fortune-evsxajkr.png"
              alt=""
              className="size-6 object-center object-cover rounded-full "
            />
            <img
              src="https://assets.codepen.io/3685267/wheel-of-fortune-pskhfbpn.png"
              alt=""
              className="size-6 object-center object-cover rounded-full "
            />
            <img
              src="https://assets.codepen.io/3685267/wheel-of-fortune-jctiffhg.png"
              alt=""
              className="size-6 object-center object-cover rounded-full "
            />
          </div>
        </div>
        <div className="px-3  shrink-0">
          <div
            className="bg-[#7080ec] pt-0.5 relative"
            style={{ borderRadius: '6px' }}
          >
            <div className="p-3  subscription-card   flex items-center relative rounded-md ">
              <img
                src="https://assets.codepen.io/3685267/wheel-of-fortune-gzonbjuu.png"
                alt=""
                className="size-14 object-center object-cover "
              />
              <div className="ml-2">
                <div className="font-bold">VIP Subscription</div>
                <div className="text-xs">
                  Purchase{' '}
                  <span className="text-[#f2c11e] font-semibold ml-1 mr-1">
                    new subscription
                  </span>
                  with in game gold
                </div>
              </div>
            </div>

            <div className="absolute size-5 top-1 right-1 rounded-full bg-[#7689ff] text-[#5068fe]  grid place-items-center">
              <PawIcon className="size-3  " />
            </div>
          </div>
        </div>
        <div className="grow overflow-hidden py-2 ">
          <div className="overflow-x-hidden overflow-y-auto h-full">
            <div className="px-3 flex flex-col  space-y-2 ">
              {[
                {
                  name: 'Madina S.',
                  image:
                    'https://assets.codepen.io/3685267/wheel-of-fortune-evsxajkr.png',
                  msg: 'I hope luck is on my today🙏',
                  time: '1 min ago',
                },
                {
                  name: 'Angelica F.',
                  image:
                    'https://assets.codepen.io/3685267/wheel-of-fortune-jctiffhg.png',
                  msg: `Hey guys, I'm here again and ready to win all of you! agin lol`,
                  time: '2 min ago',
                },
                {
                  name: 'Max A.',
                  image:
                    'https://assets.codepen.io/3685267/wheel-of-fortune-mqkqnfsn.png',
                  msg: `I'm going to take her today, she seems to have cool bonuses 😯`,
                  time: '3 min ago',
                },
                {
                  name: 'Katya V.',
                  image:
                    'https://assets.codepen.io/3685267/wheel-of-fortune-lgplemaf.png',
                  msg: `Which of you got a new VIP subscription`,
                  time: '12 min ago',
                },
              ].map(({ name, image, msg, time }, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-[#1f232e] p-2 relative rounded-md ">
                    <div className="flex pb-1 ">
                      <img
                        src={image}
                        alt=""
                        className="size-9 object-center object-cover rounded-full "
                      />
                      <div className="ml-2 ">
                        <div className="font-semibold">{name}</div>
                        <div className="text-xs mt-1 text-[#92959c]">{msg}</div>
                      </div>
                    </div>
                    <div className="flex justify-end text-xs text-[#92959c]">
                      {time}
                    </div>
                    <button className="absolute top-1 right-1 size-5 grid place-items-center ">
                      <EllipsisIcon className="size-4" />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          className="shrink-0   bg-[#1c202b] p-2 rounded-b-md text-[#373d4f] "
          style={{ borderTop: '2px solid #363d4f' }}
        >
          <div className=" ">
            <div className="relative ">
              <input
                type="text"
                placeholder="Send a message"
                className="font-semibold w-full focus:outline-none border-2 border-[#1c202b] rounded-md  px-2 h-9 focus:border-2 focus:border-[#363d4f] text-zinc-400 caret-zinc-400 bg-[#1c202b] "
              ></input>
              <div className="size-9 absolute top-0 right-0 grid place-items-center ">
                <CustomSendIcon className="size-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BottomBar() {
  return (
    <>
      <div className="fixed bottom-0 inset-x-64 pl-3 pr-7 hidden xl:block">
        <div className="bg-[#12161f]">
          <div className="flex items-center justify-center border-t-2 border-[#373e51]">
            <div className="bg-[#12161f] text-[#667088]   -mt-4 uppercase text-lg px-4 font-semibold">
              items from the chest
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 mt-3 px-2 pb-4 ">
            {[
              {
                title: "Witch's cap",
                image:
                  'https://assets.codepen.io/3685267/wheel-of-fortune-nxffhdul.png',
                dropRate: '1',
                price: '3,300.00',
              },
              {
                title: 'Poison Cauldron',
                image:
                  'https://assets.codepen.io/3685267/wheel-of-fortune-gydimcwp.png',
                dropRate: '5',
                price: '1,500.00',
              },
              {
                title: 'Oblivion Portion',
                image:
                  'https://assets.codepen.io/3685267/wheel-of-fortune-lboxprxz.png',
                dropRate: '15',
                price: '550.0',
              },
              {
                title: 'Crow Skull',
                image:
                  'https://assets.codepen.io/3685267/wheel-of-fortune-lmvdrrhl.png',
                dropRate: '24',
                price: '150.00',
              },
              {
                title: 'Fly Agaric',
                image:
                  'https://assets.codepen.io/3685267/wheel-of-fortune-csqvlgov.png',
                dropRate: '50',
                price: '250.00',
              },
              {
                title: 'Flying broom',
                image:
                  'https://assets.codepen.io/3685267/wheel-of-fortune-xiquzhpo.png',
                dropRate: '80',
                price: '50.00',
              },
            ].map(({ title, image, dropRate, price }, idx) => (
              <React.Fragment key={idx}>
                <div className="pt-7  ">
                  <div className="bg-[#212530] border border-[#393f51]  #2d313c flex items-center flex-col space-y-1.5 pb-3 rounded-md ">
                    <img
                      src={image}
                      alt=""
                      className="size-14 object-center object-cover -mt-7 scale-on-hover"
                    />
                    <span className="">{title}</span>
                    <span className="text-xs">{dropRate}% drop rate</span>
                    <div className="inline-flex items-center border border-[#393f51]  px-2 py-0.5 rounded-md ">
                      <img
                        src="https://assets.codepen.io/3685267/wheel-of-fortune-aetkeerk.png"
                        alt=""
                        className="size-4 object-center object-cover "
                      />
                      <div className="text-xs ml-1 ">{price}</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function Main() {
  return (
    <div className="fixed top-20 inset-x-0 xl:inset-x-64 pr-12 pl-4 ">
      <div className="">
        <div className="size-[740px] mx-auto relative ">
          <OtherItems />
          <Roll />
        </div>
      </div>
    </div>
  )
}

function OtherItems() {
  return (
    <>
      <div className="absolute left-0 top-0 ">
        <div className="inline-flex items-center text-xs pl-2 pr-6 h-10 rounded-full relative bg-[#25282f] text-[#94979c] border-[2px] border-[#404859e5]">
          <img
            src="https://assets.codepen.io/3685267/wheel-of-fortune-aetkeerk.png"
            alt=""
            className="size-7 object-center object-cover "
          />
          <div className="ml-2 font-semibold text-base">
            <span className="text-white ">0.</span>
            0000
          </div>
          <div className="absolute size-6 top-1/2  -translate-y-1/2 -right-2.5  transform rounded-md grid place-items-center plus-icon-bg">
            <PlusIcon className="size-4 text-white" />
          </div>
        </div>
      </div>
      <div
        className="absolute right-0 -top-4 size-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://assets.codepen.io/3685267/wheel-of-fortune-zjlspegv.png)`,
        }}
      ></div>
      <div className="absolute left-1/2 -translate-x-1/2 transform top-[250px] w-64">
        <div className="inline-flex items-center bg-[#262535] border-[2px] border-[#2f333f]  w-40 rounded-full px-3 py-1">
          <img
            src="https://assets.codepen.io/3685267/wheel-of-fortune-aetkeerk.png"
            alt=""
            className="size-8 object-center object-cover "
          />
          <div className="text-lg font-semibold ml-3">66.60</div>
        </div>
        <img
          src="https://assets.codepen.io/3685267/wheel-of-fortune-gydimcwp.png"
          alt=""
          className="size-40 object-center object-cover absolute -right-2 -top-14 "
        />
      </div>
      <div
        className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform w-64 flex items-center flex-col px-5 py-3 space-y-1 bg-[#272b35c2] text-[#7d8ba8] border-[2px] border-[#3d44528c] "
        style={{
          borderRadius: '23px',
        }}
      >
        <div className="text-base font-semibold text-white">Witch Chest</div>
        <div className="text-center">
          Dark magic and witches potions inside the chest
        </div>
        <div
          className="bg-[#7d8cff] pt-0.5 w-full "
          style={{
            borderRadius: '8px',
          }}
        >
          <button className=" text-base font-semibold buy-button w-full py-1  text-white">
            Buy a Chest x 3
          </button>
        </div>
      </div>
    </>
  )
}

let initialized = false
let ang = 0

function rotateWheel() {
  const d = 5 + Math.floor(Math.random() * 9)
  const duration = d * 0.3
  const offset = d * 36
  const direction = Math.random() > 0.5 ? 1 : -1
  ang += offset * direction

  gsap.to('#roll', {
    rotation: ang,
    transformOrigin: '50% 50%',
    duration,
    onComplete: () => {
      gsap.delayedCall(1.5, rotateWheel)
    },
  })
}

export default function () {
  useLoadJS('/js/gsap/3.13.0/gsap.min.js', () => {
    if (!initialized) {
      initialized = true
      rotateWheel()
    }
  })
  return (
    <div className="animation__wheel-fortune">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"
      />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <SidebarLeft />
      <Nav />
      <SidebarRight />
      <Main />
      <BottomBar />
    </div>
  )
}
